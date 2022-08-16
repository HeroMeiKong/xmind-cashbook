import Server from './server';

class CashBook extends Server {
  // 获取账单分类
  async getCashbookCategories() {
    const path = '/get_cashbook_categories';

    try {
      const result = await Server.fetch('get', path);
      if (result.ok) {
        return result.data;
      } else {
        throw result.error;
      }
    } catch (error) {
      console.log({
        url: path,
        error
      });
      throw error;
    }
  }

  // 获取账单数据
  async getCashbookData() {
    const path = '/get_cashbook_data';

    try {
      const result = await Server.fetch('get', path);
      if (result.ok) {
        return result.data;
      } else {
        throw result.error;
      }
    } catch (error) {
      console.log({
        url: path,
        error
      });
      throw error;
    }
  }
}

export default new CashBook();
export const getCashbookCategories = CashBook.prototype.getCashbookCategories;
export const getCashbookData = CashBook.prototype.getCashbookData;
