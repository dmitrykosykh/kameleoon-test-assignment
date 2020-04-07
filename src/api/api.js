import Tool from './tool';

async function fetchTools() {
  try {
    const url = './Tools.json';
    const response = await fetch(url);
    return response.json();
  } catch {
    return [];
  }
}

async function getTools() {
  try {
    const tools = await fetchTools();
    return tools.map((tool) => new Tool(tool));
  } catch {
    return [];
  }
}

export { getTools };
