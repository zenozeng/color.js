// Color.js -- a color operation library
// Copyright (C) 2013 Zeno Zeng
// Licesed Under the MIT license
// Time-stamp: <2013-01-30 22:59:04 Zeno Zeng>
// Version 0.0.2

function Color(arg0, arg1, arg2, arg3) {
    var r, g, b, c, m, y, k;
    var hexArray = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F'];
    if(arg3) {
        // color(c, m, y, k)
        c = arg0;
        m = arg1;
        y = arg2;
        k = arg3;
    } else if(arg2) {
        // color(r, g, b)
        r = arg0;
        g = arg1;
        b = arg2;
    } else {
        var str = arg0, arr = [];
        arr = str.split(',');
        if(arr.length == 1)
          arr = str.split('-');
        if(arr.length == 1)
          arr = str.split(':');
        if(arr.length == 1)
          arr = str.split(' ');
        if(arr.length == 4) {
            c = arr[0];
            m = arr[1];
            y = arr[2];
            k = arr[3];
        } else if(arr.length == 3) {
            r = arr[0];
            g = arr[1];
            b = arr[2];
        } else {
            var hex = arg0, rgb;
            hex = hex.replace(/#/g, '');
            hex = hex.toUpperCase();
            arr = [], rgb = [];
            arr = hex.split('');
            // 缩写模式
            if(hex.length == 3) {
                for(var i=0; i < 3; i++) {
                    rgb[i] = hexArray.indexOf(arr[i]) * 17;
                }
            } else if(hex.length == 6) {
                for(var i=0; i < 6; i = i+2) {
                    rgb[i/2] = hexArray.indexOf(arr[i]) * 16 + hexArray.indexOf(arr[i+1]);
                }
            } else {
                console.log('Error: invalid color format input');
                return false;
            }
            r = rgb[0];
            g = rgb[1];
            b = rgb[2];
        }
        if(c && m && y && k) {
            //todo: cmyk 2 rgb
            c = c/100;
            m = m/100;
            y = y/100;
            k = k/100;
            r = parseInt((1 - (c*(1-k) + k)) * 255);
            g = parseInt((1 - (m*(1-k) + k)) * 255);
            b = parseInt((1 - (y*(1-k) + k)) * 255);
            r = r > 0 ? r : 0;
            g = g > 0 ? g : 0;
            b = b > 0 ? b : 0;
            r = r > 255 ? 255 : r;
            g = g > 255 ? 255 : g;
            b = b > 255 ? 255 : b;
        }
    }

    this.toHEX = function() {
        var result = '#';
        var arr = [r, g, b];
        for(var i=0; i<3; i++) {
            var partI = parseInt(arr[i] / 16);
            result += hexArray[partI];
            result += hexArray[arr[i] - 16 * partI];
        }
        return result;
    };

    this.toRGB = function() {
        return [r, g, b];
    };

    this.toCMYK = function() {
        // todo: RGB to CMYK
        // 这是一个不太靠谱的算法，实际使用可能还是需要一些校正，仅供参考

        if(c && m && y && k) {
          return [c,m,y,k];
        } else {
            var div;
            k = parseInt(Math.min(255-r,255-g,255-b)/2.55);
            div = 100 - k;
            div = div == 0 ? 1 : div;
            c = ((100 - r/2.55 - k)/div)*100;
            m = ((100 - g/2.55 - k)/div)*100;
            y = ((100 - b/2.55 - k)/div)*100;
            c = c > 100 ? 100 : Math.round(c);
            m = m > 100 ? 100 : Math.round(m);
            y = y > 100 ? 100 : Math.round(y);
            k = k > 100 ? 100 : Math.round(k);
            return [c,m,y,k];
        }
    };

    // 反色
    this.invert = function() {
        return [255 - r, 255 - g, 255 - b];
    };

    // 加亮
    this.lighter = function(lv) {
        lv = lv ? lv : 1;
        return [Math.min(r+5*lv, 255), Math.min(g+5*lv, 255), Math.min(b+5*lv, 255)];
    }

    // 变暗
    this.darker = function(lv) {
        lv = lv ? lv : 1;
        return [Math.max(r-5*lv, 0), Math.max(g-5*lv, 0), Math.max(b-5*lv, 0)];
    }

    this.toRBG = function() {
        return [r, b, g];
    };

    this.toBRG = function() {
        return [b, r, g];
    };

    this.toBGR = function() {
        return [b, g, r];
    };

    this.toGRB = function() {
        return [g, r, b];
    };

    this.toGBR = function() {
        return [g, b, r];
    };
}