import dimmerMixin from '../dimmer';
import orderbyMixin from './orderby';
import paginationMixin from './pagination';

function applyIf(target, source) {
	for(var i in source) {
		if(target[i] == void 0) {
			target[i] = source[i];
		}
	}
}


export default {

	mixins: [orderbyMixin, paginationMixin, dimmerMixin],

	data() {
		return {
			table: {
				ajaxURL: null,
				pagination: true,
				orderby: true,
				dimmer: true
			}
		}
	},

	methods: {

		resetTable() {
			this.resetPagination();
			this.resetOrderby();
        },

		nextPage(params) {
			this.loadTableByParams(params);
		},

		orderBy(params) {
			this.loadTableByParams(params);
		},

		fillQueryParams(params) {
			this.table.pagination && applyIf(params, this.getPage());
			this.table.orderby && applyIf(params, this.getOrderby());
			this.fillCustomQueryParams(params);
		},

		fillCustomQueryParams(params) {

		},

		loadTable(callback) {
			this.loadTableByParams(null, callback);
		},

		loadTableByParams(params, callback) {
			var dimmerTime = Date.now();
			if(this.table.dimmer) {
				this.dimmer();
			}
			params = params || {};
			this.fillQueryParams(params);
			this.requestTable(params, () => {
				if(this.table.dimmer) {
					setTimeout(() => this.undimmer(), 400-(Date.now()-dimmerTime));
				}
				callback && callback();
			});
		},

		requestTable(params, callback) {
			var orderBy = params.orderBy;
			var desc = params.desc;
			var pageNo = params.pageNo;
			var pageSize = params.pageSize;

			if(!this.table.ajaxURL) {
				throw new Error('table.ajaxURL not set');
			}
			$.ajax({
				url: this.table.ajaxURL,
				data: params,
				success: (data) => {
					if(TEST) {
						this.updateTable(data, params);
					}
					if(data.code != 0) {
						callback && callback();
					} else {
						this.updateTable(data, params);
						callback && callback();
					}
			}
			});
		},

		updateTable(data, params) {
			this.updateTableMixins(data, params);
		},

		updateTableMixins(data, params) {
			this.setOrderby({
				current: params.orderBy,
				desc: params.desc
			});
			this.setPage(data.page);
		}

	}

}
