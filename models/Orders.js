import moment from 'moment';

export default class Orders {
  constructor(id, items, price, date) {
    this.id = id;
    this.items = items;
    this.price = price;
    this.date = date;
  }

  get readable() {
    return moment(this.date).format('MMMM Do YYYY, hh:mma');
  }
}
