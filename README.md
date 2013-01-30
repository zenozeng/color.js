# color.js -- a color operation library
Copyright (C) 2013 Zeno Zeng
Licesed Under the MIT license

## 注意
这个CMYK算法有点不太靠谱……

## Code Example
```javascript
// create, each of the following ways is ok
// hex
c = new Color('abcdef') 
c = new Color('#abcdef')
// rgb
c = new Color(171, 205, 239) 
c = new Color('171-205-239')
c = new Color('171 205 239')
c = new Color('171:205:239')
// cmyk
c = new Color(29, 14, 0, 6)
c = new Color('29-14-0-6')
c = new Color('29 14 0 6')
c = new Color('29:14:0:6')
// operate
c.toRGB()
[171, 205, 239]
c.toCMYK()
[29, 14, 0, 6]
c.lighter()
[176, 210, 244]
c.lighter(3)
[186, 220, 254]
c.darker()
[166, 200, 234]
c.toHEX()
"#ABCDEF"
```

