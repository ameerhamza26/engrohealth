angular.module('app.directives', [])

.directive('headerBar', function() {
	return {
		restrict: 'AE',
		scope: {
			texta : '=texta',
			textb : '=textb',
			img: '=img',
			subicon: '=subicon'
		},
		templateUrl: 'templates/header.html'
	}
})
