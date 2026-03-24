export const fetchWithTimeout = async (url: string, timeout = 5000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  console.group("------------")
  console.log("START FETCHING")

  try {
    const response = await fetch(url, {
      signal: controller.signal
    });
    console.log("SUCCESS FETCHED")
    console.groupEnd()
    return response;
  } catch (error) {
    console.log("ABORT CONTROLLER ERROR: ", error)
    console.groupEnd()

    if ((error as any).name === 'AbortError') {
      throw new Error('Request timeout');
    }

    throw error;
  } finally {
    clearTimeout(id);
  }
};