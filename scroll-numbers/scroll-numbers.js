Component({
  externalClasses: ['custom-number-style'],
  /**
   * 组件的属性列表
   */
  properties: {
    /**
     * 滚动数字的值
     * @default ''
     */
    value: {
      type: String,
      value: ''
    },
    /**
     * 数字的字符大小，单位为 `rpx`
     * @default 48
     */
    fontSize: {
      type: Number,
      value: 48
    },
    /**
     * 是否使用 `inline-flex` 内联形式的 flex 布局
     * @default true
     */
    inlineFlex: {
      type: Boolean,
      value: true
    },
    /**
     * 动画的运动时长
     * @default 200
     */
    duration: {
      type: Number,
      value: 200
    },
    /**
     * 每个数字运动的延迟时间
     * @default 100
     */
    delay: {
      type: Number,
      value: 100
    },
    /**
     * 文本的颜色
     * @default #333
     */
    color: {
      type: String,
      value: '#333'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    valueArr: [], // 数字转为数组形式存放
    animationStyleArr: [],  // 每个数字的运动属性样式
    numberList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], // 罗列所有数字，用于运动滚动
    isNaNAnimate: ''  // 非数字字符的运动模式
  },

  observers: {
    /**
     * 监听滚动的数字变化，格式化为数组 valueArr
     */
    value: function(scrollNumbersValues) {
      let valueArr = [];
      if (scrollNumbersValues) {
        valueArr = scrollNumbersValues.split('').map(item => {
          return { value: item, isNaN: isNaN(item) }
        });
      }
      this.setData({
        valueArr
      });
      this.getNumberItemHeight();
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 通过 `.number-item` 的计算数字高度
     */
    getNumberItemHeight() {
      this.createSelectorQuery().select('.number-item').boundingClientRect().exec( res => {
        this.setData({
          itemHeight: res[0]?.height || 36,
        });
        this.startScrollNumberAnimate();
      });
    },
    /**
     * 开始滚动动画
     */
    startScrollNumberAnimate() {
      let { itemHeight, valueArr, delay, numberList} = this.data;
      if (itemHeight <= 0) return

      let animationStyleArr = [];
      let isNaNAnimate = '';
      valueArr.forEach((item, index) => {
        if (!item.isNaN) {
          animationStyleArr.push(`transition-delay: ${delay * index}ms; transform: translateY(${-100 * (numberList[parseInt(item.value)])}%); opacity: 1;`)
        } else {
          isNaNAnimate = 'transform: translateY(0);opacity: 1;';
          animationStyleArr.push(null);
        }
      })
      this.setData({
        animationStyleArr,
        isNaNAnimate
      })
    }
  }
})
