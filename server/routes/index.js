let express = require('express');
let router = express.Router();
router.use(express.static('public'));

let products = {
    "status": "1", "msg": "", "sort": "desc", "pageNum": 0, "data": {
        "count": 8,
        "list": [{
            "id": 1,
            "productId": 10001,
            "productName": "小米6",
            "productPrice": 2499,
            "checked": "0",
            "productNum": 0,
            "productImg": "mi6.jpg",
            "sub_title": "此仅为支付测试商品 拍下不会发货\n",
            "limit_num": 10,
            "desc": "",
            "descImg": "xiaomi6.jpg",
            "productDetails": "小米6 全网通 4GB+64GB 亮黑色 移动联通电信4G手机 双卡双待 小米6变焦双"
        }, {
            "id": 2,
            "productId": 10002,
            "productName": "小米笔记本",
            "productPrice": 3999,
            "checked": "0",
            "productNum": 0,
            "productImg": "note.jpg",
            "sub_title": "此仅为支付测试商品 拍下不会发货\n",
            "limit_num": 10,
            "desc": "",
            "descImg": "xiaomi-matebook.jpg",
            "productDetails": "小米(MI)Air 13.3英寸全金属轻薄笔记本电脑(i5-7200U 8G 256G固态硬盘 全高清屏 背光键盘 Win10)银"
        }, {
            "id": 3,
            "productId": 10003,
            "productName": "小米音响",
            "productPrice": 199,
            "checked": "0",
            "productNum": 0,
            "productImg": "1.jpg",
            "sub_title": "此仅为支付测试商品 拍下不会发货\n",
            "limit_num": 10,
            "desc": "",
            "descImg": "",
            "productDetails": "小米（MI）小钢炮蓝牙音箱2 迷你便携音响 户外蓝牙音响 免提通话（黑色）"
        }, {
            "id": 4,
            "productId": 10004,
            "productName": "Leme1",
            "productPrice": 1999,
            "checked": "0",
            "productNum": 0,
            "productImg": "3.jpg",
            "sub_title": "此仅为支付测试商品 拍下不会发货\n",
            "limit_num": 10,
            "desc": "",
            "descImg": "",
            "productDetails": "乐视（Letv） 无线头戴式 Leme蓝牙耳机2代 EB30 无线蓝牙4.1耳机包邮 红色"
        }, {
            "id": 5,
            "productId": 10005,
            "productName": "乐视盒子",
            "productPrice": 299,
            "checked": "0",
            "productNum": 0,
            "productImg": "5.jpg",
            "sub_title": "此仅为支付测试商品 拍下不会发货\n",
            "limit_num": 10,
            "desc": "",
            "descImg": "",
            "productDetails": "乐视TV（Letv） 乐视盒子U4 Pro 3D 4K 四核高清电视硬盘播放器网络机顶盒 裸机版U4（不含影视会员）"
        }, {
            "id": 6,
            "productId": 10006,
            "productName": "小米插座",
            "productPrice": 99,
            "checked": "0",
            "productNum": 0,
            "productImg": "6.jpg",
            "sub_title": "此仅为支付测试商品 拍下不会发货\n",
            "limit_num": 10,
            "desc": "",
            "descImg": "",
            "productDetails": "小米（MI）插排插线板 多功能接线板3/5孔插座拖线板米家6位排插企业办公定制LOGO刻字 米家插线板6位基础版-白色"
        }, {
            "id": 7,
            "productId": 10007,
            "productName": "小米耳机",
            "productPrice": 199,
            "checked": "0",
            "productNum": 0,
            "productImg": "7.jpg",
            "sub_title": "此仅为支付测试商品 拍下不会发货\n",
            "limit_num": 10,
            "desc": "",
            "descImg": "",
            "productDetails": "小米（MI）耳机 小米活塞耳机 炫彩版 星空钛版耳机适用于红米NOTE华为系列 基础版-粉色"
        }, {
            "id": 8,
            "productId": 10008,
            "productName": "小米硬盘400G",
            "productPrice": 1999,
            "checked": "0",
            "productNum": 0,
            "productImg": "8.jpg",
            "sub_title": "此仅为支付测试商品 拍下不会发货\n",
            "limit_num": 10,
            "desc": "",
            "descImg": "",
            "productDetails": "小米硬盘400G"
        }]
    }
};

let cart = [];

// 查询商品列表
router.get('/list', function (req, res, next) {
    let result = products;
    res.json(result);
});

// 搜索框接口
router.get('/searchData', (req, res, next) => {
    res.json(products);
});
// 加入购物车
router.get('/addCart', function (req, res) {
    let productId = parseInt(req.param('productId')); // 获取前台传过来的productId值
    let productNum = parseInt(req.param('productNum')); // 获取前台传过来的productId值
    // let username = '123456@qq.com';
    let result = products.data.list.filter(m => m.productId === productId)
    let userId = req.cookies.userId;
    let proId = result[0].productId;
    let proName = result[0].productName;
    let proPrice = result[0].productPrice;
    let checked = '1';
    // let proNum = 1;
    let proImg = result[0].productImg;
    let totalMoney = proPrice * productNum;


    if (cart.some(s => s.productId === productId && s.userId === userId)) {
        let result = cart.filter(s => s.productId === productId && s.userId === userId) [0];

        result.proNum = result.productNum + productNum;
        result.proPrice = result.productPrice;
        result.totalMoney = result.proNum * proPrice;


    } else {
        cart.push({
            userId, proId, proName, proPrice, checked, productNum, proImg, totalMoney
        });
    }
    res.json({
        status: '1',
        msg: '添加购物车成功!',
        result: ''
    });
});

//查看商品详情
router.get('/getDetails', (req, res, next) => {
    let productId = parseInt(req.param('productId')); // 获取前台传过来的productId值
    res.json({
        status: '1',
        msg: '',
        result: products.data.list.filter(m => m.productId === productId)
    });
})
module.exports = router;