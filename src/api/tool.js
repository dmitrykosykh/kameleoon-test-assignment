class Tool {
  constructor(options) {
    this.id = options.id;
    this.name = options.name;
    this.sites = this.convertSites(options.sites);
    this.type = this.convertType(options.type);
    this.status = options.status;
  }

  convertSites = (sites) => {
    if (sites === 1) {
      return '1 site';
    } else if (sites > 1) {
      return `${sites} sites`;
    }
    return sites;
  }

  convertType = (type) => {
    switch (type) {
      case 'email':
        return 'Email';
      case 'tag_manager':
        return 'Tag manager';
      case 'dmp_crm':
        return 'DMP / CRM';
      case 'analytics':
        return 'Analytics';
      case 'heatmap':
        return 'Heatmap';
      default:
        return '';
    }
  }
}

export default Tool;
