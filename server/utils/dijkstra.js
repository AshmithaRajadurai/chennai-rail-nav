/**
 * Dijkstra's shortest path algorithm for railway station indoor navigation with accessibility filtering
 * and bilingual (English & Tamil) navigation step instructions.
 *
 * @param {Array} nodes - Array of Node documents
 * @param {Array} edges - Array of Edge documents
 * @param {String} startNodeId - Starting Node ID
 * @param {String} endNodeId - Destination Node ID
 * @param {Object} options - Navigation options { requireAccessible: false }
 * @returns {Object} { success: Boolean, totalDistance?: Number, pathNodes?: Array, instructions?: Array, instructionsTa?: Array, message?: String }
 */
export function findPath(nodes, edges, startNodeId, endNodeId, options = {}) {
  const requireAccessible = Boolean(options.requireAccessible);

  // Map nodes by nodeId for fast lookup
  const nodeMap = new Map();
  nodes.forEach((node) => {
    nodeMap.set(node.nodeId, node.toObject ? node.toObject() : node);
  });

  const startNode = nodeMap.get(startNodeId);
  const endNode = nodeMap.get(endNodeId);

  if (!startNode || !endNode) {
    return {
      success: false,
      message: 'Invalid starting point or destination selected.',
      messageTa: 'தவறான தொடக்க இடம் அல்லது சேருமிடம் தேர்ந்தெடுக்கப்பட்டுள்ளது.',
    };
  }

  if (startNodeId === endNodeId) {
    return {
      success: true,
      totalDistance: 0,
      pathNodes: [startNode],
      instructions: [`You are already at ${startNode.name}.`],
      instructionsTa: [`நீங்கள் ஏற்கனவே ${startNode.nameTa || startNode.name}-ல் உள்ளீர்கள்.`],
    };
  }

  // Build Adjacency List
  const adj = new Map();
  nodes.forEach((n) => adj.set(n.nodeId, []));

  edges.forEach((edge) => {
    const edgeObj = edge.toObject ? edge.toObject() : edge;

    // Filter out inoperational edges
    if (edgeObj.isOperational === false) {
      return;
    }

    // Accessibility filter: completely exclude edges with stairs if accessible route is required
    if (requireAccessible && edgeObj.hasStairs) {
      return;
    }

    const fromId = edgeObj.fromNode;
    const toId = edgeObj.toNode;

    if (!adj.has(fromId)) adj.set(fromId, []);
    if (!adj.has(toId)) adj.set(toId, []);

    // Effective search weight:
    // When stairs are allowed (standard route), elevator carries a slight wait penalty so direct stairs shortcuts are preferred
    let effectiveWeight = Number(edgeObj.distance);
    if (!requireAccessible && edgeObj.hasElevator) {
      effectiveWeight += 15;
    }

    adj.get(fromId).push({
      neighbor: toId,
      weight: effectiveWeight,
      distance: Number(edgeObj.distance),
      edge: edgeObj,
    });
  });

  // Dijkstra data structures
  const distances = new Map();
  const previous = new Map();
  const visited = new Set();

  nodes.forEach((n) => {
    distances.set(n.nodeId, Infinity);
  });
  distances.set(startNodeId, 0);

  const unvisited = new Set(nodeMap.keys());

  while (unvisited.size > 0) {
    let curr = null;
    let minDistance = Infinity;

    for (const nodeId of unvisited) {
      const d = distances.get(nodeId);
      if (d < minDistance) {
        minDistance = d;
        curr = nodeId;
      }
    }

    if (!curr || minDistance === Infinity) {
      break;
    }

    if (curr === endNodeId) {
      break;
    }

    unvisited.delete(curr);
    visited.add(curr);

    const neighbors = adj.get(curr) || [];
    for (const edge of neighbors) {
      if (visited.has(edge.neighbor)) continue;

      const alt = distances.get(curr) + edge.weight;
      if (alt < distances.get(edge.neighbor)) {
        distances.set(edge.neighbor, alt);
        previous.set(edge.neighbor, {
          nodeId: curr,
          distance: edge.distance,
          edge: edge.edge,
        });
      }
    }
  }

  // Check if destination was reached
  if (!previous.has(endNodeId)) {
    return {
      success: false,
      message: 'No accessible route found between selected points',
      messageTa: 'தேர்ந்தெடுக்கப்பட்ட இடங்களுக்கு இடையே மாற்றுத்திறனாளி / அணுகக்கூடிய பாதை இல்லை',
    };
  }

  // Reconstruct path
  const pathNodeIds = [];
  const pathEdges = [];
  let curr = endNodeId;

  while (curr) {
    pathNodeIds.unshift(curr);
    const prev = previous.get(curr);
    if (prev) {
      pathEdges.unshift(prev.edge);
      curr = prev.nodeId;
    } else {
      curr = null;
    }
  }

  // Calculate actual physical distance
  let totalDistance = 0;
  pathEdges.forEach((edge) => {
    totalDistance += Number(edge.distance) || 0;
  });

  const pathNodes = pathNodeIds.map((id) => nodeMap.get(id));

  // Generate human-readable navigation instructions in English
  const instructions = [];
  instructions.push(`Start at ${startNode.name}`);

  // Generate human-readable navigation instructions in Tamil
  const instructionsTa = [];
  instructionsTa.push(`தொடக்க இடம்: ${startNode.nameTa || startNode.name}`);

  for (let i = 0; i < pathEdges.length; i++) {
    const edge = pathEdges[i];
    const from = pathNodes[i];
    const to = pathNodes[i + 1];

    const floorTa = to.floor === 'Ground' ? 'தரைத்தளம்' : to.floor === 'Level 1' ? 'முதல் தளம்' : to.floor === 'Subway' ? 'சுரங்க நடைபாதை' : to.floor;

    // English instruction
    if (edge.hasElevator) {
      instructions.push(`Take ${from.name} (Elevator) to ${to.floor}`);
      instructionsTa.push(`${from.nameTa || from.name} (மின்தூக்கி) வழியாக ${floorTa} செல்லவும்`);
    } else if (edge.hasRamp) {
      instructions.push(`Follow accessible ramp (${edge.distance}m) towards ${to.name}`);
      instructionsTa.push(`சாய்வுதளம் (${edge.distance} மீ) வழியாக ${to.nameTa || to.name} நோக்கிச் செல்லவும்`);
    } else if (edge.hasStairs) {
      instructions.push(`Take stairs/escalator (${edge.distance}m) to ${to.name}`);
      instructionsTa.push(`படிக்கட்டுகள் (${edge.distance} மீ) வழியாக ${to.nameTa || to.name} செல்லவும்`);
    } else if (edge.instruction) {
      instructions.push(`Walk ${edge.distance}m towards ${to.name}: ${edge.instruction}`);
      instructionsTa.push(edge.instructionTa ? `${edge.instructionTa} (${edge.distance} மீ)` : `${to.nameTa || to.name} நோக்கி ${edge.distance} மீ நடக்கவும்`);
    } else {
      instructions.push(`Walk ${edge.distance}m towards ${to.name}`);
      instructionsTa.push(`${to.nameTa || to.name} நோக்கி ${edge.distance} மீ நடக்கவும்`);
    }
  }

  instructions.push(`Arrive at ${endNode.name}`);
  instructionsTa.push(`${endNode.nameTa || endNode.name} சென்றடைந்தீர்கள்`);

  return {
    success: true,
    totalDistance,
    pathNodes,
    instructions,
    instructionsTa,
  };
}

export default findPath;
