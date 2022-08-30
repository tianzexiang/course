# week-05

1. 因为webpack会将vue文件中的引用打包至public文件夹下，所以除public文件下的引用文件的路径会被替换，所以如果有需要加载的静态资源，需要将资源放在public下，且引用路径前不需要加`public/`