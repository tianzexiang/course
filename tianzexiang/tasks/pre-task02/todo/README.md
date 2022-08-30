
## 作业思路和问题
1. 本次主要卡在css的写法上，一开始使用css modules解决方案，但是感觉跟vue写起来处处受限制，换成styled-components后书写体验瞬间上升几个档次
2. 好像目前@craco/craco 只支持react-script v4.x，但最新react-script为5.x，所以设置路径别名要用eject将webpack配置文件暴露。