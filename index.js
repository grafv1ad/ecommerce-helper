class ECommerceHelper {
    constructor(options = {}) {
        this.debug = options.debug || false;

        window.dataLayer = window.dataLayer || [];
    }

    push(event, data) {
        const object = {
            event: event,
            ecommerce: data,
        };

        dataLayer.push({ ecommerce: null });
        dataLayer.push(object);

        if (this.debug) console.debug(object);
    }

    formatData(data) {
        data = { ...data };
        if (data.hasOwnProperty('price')) data.price = parseFloat(data.price) || 0;
        if (data.hasOwnProperty('index')) data.index = parseInt(data.index) || 1;
        if (data.hasOwnProperty('quantity')) data.quantity = parseInt(data.quantity) || 1;
        return data;
    }

    viewList(items) {
        this.push('view_item_list', {
            items: items.map(item => this.formatData(item)),
        });
    }

    clickProduct(item) {
        this.push('select_item', {
            items: [ this.formatData(item) ],
        });
    }

    viewProduct(item) {
        this.push('view_item', {
            items: [ this.formatData(item) ],
        });
    }

    addProduct(item) {
        this.push('add_to_cart', {
            items: [ this.formatData(item) ],
        });
    }

    removeProduct(item) {
        this.push('remove_from_cart', {
            items: [ this.formatData(item) ],
        });
    }

    checkout(items) {
        this.push('begin_checkout', {
            items: items.map(item => this.formatData(item)),
        });
    }

    purchase(data, items) {
        const object = this.formatData(data);
        object.items = items.map(item => this.formatData(item));

        this.push('purchase', object);
    }

    refund(data, items) {
        const object = this.formatData(data);
        if (items) object.items = items.map(item => this.formatData(item));

        this.push('refund', object);
    }

    viewPromotion(items) {
        this.push('view_promotion', {
            items: items.map(item => this.formatData(item)),
        });
    }

    clickPromotion(item) {
        this.push('select_promotion', {
            items: [ this.formatData(item) ],
        });
    }
}

const EC = new ECommerceHelper({ debug: true });
