

defineClass('TTMainViewController', {
    ttLiveFakeNavigationBarEllipsisBtnClicked:function() {
        var model = self.topInfoModel;
        self.setUpShareFollowViewWithModel(model);
        self.shareFollowView.showAnimate(true);
    }
});