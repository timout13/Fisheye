export default class DataService {
  static async fetchData(url) {
    try {
      const response = await fetch(url, { method: "GET", headers: { "Content-Type": "application/json" } });
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  }

  static getAuthorById(id, authors) {
    return authors.find((author) => author.id === id) || null;
  }

  static getMediaByAuthorId(media, authorId) {
    return media.filter((item) => item.photographerId === authorId);
  }
}