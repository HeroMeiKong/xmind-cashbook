export default {
  formatTime: (timestamp: Date | number, format?: string) => {
    const day = new Date(timestamp);
    const Y = day.getFullYear();
    const M =
      day.getMonth() >= 9 ? day.getMonth() + 1 : `0${day.getMonth() + 1}`;
    const D = day.getDate() > 9 ? day.getDate() : `0${day.getDate()}`;
    const H = day.getHours() > 9 ? day.getHours() : `${day.getHours()}`;
    const m = day.getMinutes() > 9 ? day.getMinutes() : `${day.getMinutes()}`;
    const s = day.getSeconds() > 9 ? day.getSeconds() : `${day.getSeconds()}`;

    switch (format) {
      default:
        return `${Y}-${M}-${D}`;
    }
  },
  getUserName: () => {
    return (window as any).JIRA?.Users?.LoggedInUser?.userName();
  }
};
