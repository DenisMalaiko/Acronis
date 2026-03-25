import { i18n  } from "../../app/i18n";

export const fetchWithTimeout = async (url: string, timeout = 5000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      signal: controller.signal
    });

    return response;
  } catch (error: any) {
    if (error.name === 'AbortError') {
      throw new Error(i18n.global.t('Errors.RequestTimeout'));
    }

    throw error;
  } finally {
    clearTimeout(id);
  }
};