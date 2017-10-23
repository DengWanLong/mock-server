const dimmerTemplate = `
  <div class="ui inverted dimmer ok-dimmer">
      <div class="ui text dimmer-content"><i class="check circle icon"></i><br/><span></span></div>
  </div>`;

export default {

	methods: {

		dimmer(params) {
      var $template = $(dimmerTemplate);
      $(".dimmer").remove();
      $template.find("span").html(params && params.content || '');
      $(params && params.el || this.$el).find(".ok-dimmer span").html(params && params.content || '');
			$(params && params.el || this.$el).dimmer({
		        closable: false,
		        template: {
		            dimmer: function() {
		                return $template;
		            }
		        }
		    }).dimmer('show');
      if(!params || params.autoClose !== false) {
        let timeout = setTimeout(() => {
          this.undimmer(params);
          clearTimeout(timeout);
        }, 1000);
      }
		},

		undimmer(params) {
			$(params && params.el || this.$el).dimmer('hide');
		}

	}

}
