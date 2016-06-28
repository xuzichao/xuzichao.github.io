

defineClass('TTLiveMainViewController', {
    ttLiveFakeNavigationBarEllipsisBtnClicked:function() {
            var model = self.topInfoModel;
            self.setUpShareFollowViewWithModel(model);
            var shareView = self.shareFollowView;
            shareView.showAnimate(true);
    }
});