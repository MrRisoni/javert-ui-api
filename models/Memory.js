
module.exports = class MemoryMdl {
  constructor(data) {
    this.type = data.name;
    this.used = data.used;
    this.total = data.total;

  }
