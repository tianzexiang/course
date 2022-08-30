**遇到的问题**
1. 将createElement封装函数后，ts无法自动推导为HTMLImageELement，目前使用类型断言解决。
2. ts下有时候需要使用if判断类型不为空才能继续使用属性或使用类型断，但好像if判断更好
