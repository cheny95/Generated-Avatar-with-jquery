/**
 * Chan.Avatar 头像生成插件 @ Ying Chan
 *
 * 调用方法
 *
 * 入参 object 必填
 * 即使不写参数 也要传入一个空对象   如：  $('#id').avatarIcon(params={});  或 var params={};  $('#id').avatarIcon(params);
 * id选择器
 * $('#id').avatarIcon(object);
 * 类选择器(数组)
 * $('.class').avatarIcon(object);
 *
 * var params = {
 * name: string (可选参数，建议必填)             --- 姓名  字符串 如：张三， 不传则为 “未知”
 * url: string (可选参数，建议必填)              --- 头像url  字符串 如果有请传入，否则会多生成一个头像
 * sub: int (可选参数)                          --- 截取长度，默认为一个字符，为2的时候，从后向前截取2个字符 如 sub==1的时候，张三，结果是张，sub==2的时候，结果是张三，三个字姓名，张宝贝，结果是宝贝。
 * sex: string (可选参数，建议必填)              --- 性别  1个大写英文字母 M和F  默认 F
 * width: string (可选参数)                     --- 头像宽度  标准css写法 如 100px,10em,  默认为100px
 * height:string (可选参数)                     --- 头像高度  标准css写法 如 100px,10em,  默认为100px
 * borderStyle: string (可选参数)               --- 边框风格  标准css写法 如solid,  默认为solid
 * borderWidth: string (可选参数)               --- 边框宽度  标准css写法 如 1px,  默认为1px
 * borderColor: string (可选参数)               --- 边框颜色  1个色值 如：'#bbb'，支持16进制，rgba，英文单词，默认#eee
 * bgColor: array (可选参数)                    --- 背景颜色  2个色值 如：['#aaa','#bbb']，第一个是男，第二个是女，支持16进制，rgba，英文单词混合  默认['rgba(116,209,234,1)', 'rgba(252,174,187,1)']
 * borderRadius: Boolean (可选参数)             --- 是否圆头像  true or false, 默认圆形头像
 * lineHeight: string (可选参数)                --- 文字行高  标准css写法  如 100px   默认与头像高度一致
 * textAlign: string (可选参数)                 --- 文字是否居中  标准css写法 ,如center. 默认center
 * fontSize: string (可选参数)                  --- 文字大小  标准css写法 ,如12px. 默认 1个字 58px，2个字 42px
 * color: string (可选参数)                     --- 文字颜色 1个色值 如：'#bbb'，支持16进制，rgba，英文单词，默认#fff
 * };
 *
 *
 * 注意
 * 1.请先引用jquery
 * 2.如果在初始化入参没有传入参数
 * 将会在selector里获取 data-name和data-sex
 * 3.原来已经有头像的情况下，请将html格式写为
 * <div id="selector"> <img src="图片地址" /> </div>
 * 将会在选择器下面的img标签自动找src的地址
 * 4.以上注意事项请务必保留一个入参值
 * 5.同一个选择器请只调用一次
 *
 *
 * 示例代码
 * <div class="aaa" data-sex="M" data-name="妞妞">
 * <img src="http://pic11.photophoto.cn/20090427/0010023588064534_b.jpg" alt="">
 * </div>
 * <div class="aaa" id="as" data-sex="M" data-name="李小明">
 * </div>
 * <div class="aaa" data-sex="F">
 * </div>
 * <div id="a" data-sex="F">
 * </div>
 * <script type="text/javascript">
 * var params = {sub:2};
 * $('.aaa').avatarIcon(params);
 * </script>
 */

(function ($) {
    $.fn.extend({
        avatarIcon: function (params) {
            if (params) {
                var value = {
                    name: params.name ? params.name : '未知',
                    url: params.url ? params.url : '',
                    sub: params.sub > 0 && params.sub <= 2 ? params.sub : 1,
                    sex: params.sex ? params.sex : 'M'
                };
                var style = {
                    width: params.width ? params.width : '100px',
                    height: params.height ? params.height : '100px',
                    borderStyle: params.borderStyle ? params.borderStyle : 'solid',
                    borderWidth: params.borderWidth ? params.borderWidth : '1px',
                    borderColor: params.borderColor ? params.borderColor : '#eee',
                    backgroundColor: $.isArray(params.bgColor) && params.bgColor.length > 0 && params.bgColor.length <= 2 ? params.bgColor : ['rgba(116,209,234,1)', 'rgba(252,174,187,1)'],
                    borderRadius: params.borderRadius ? params.borderRadius : '50%',
                    lineHeight: params.height ? params.height : '100px',
                    textAlign: params.textAlign ? params.textAlign : 'center',
                    fontSize: params.fontSize ? params.fontSize : '42px',
                    color: params.color ? params.color : '#fff'
                };
                //判断名字长度
                if (!params.fontSize) {
                    if (value.sub == 1 && style.fontSize == '42px') {
                        style.fontSize = '58px';
                    } else {
                        style.fontSize = '42px';
                    }
                }

                if ($(this).length == 1) {
                    value.name = params.name ? params.name : $(this).data('name');
                    value.name = value.name ? value.name : '未知';
                    value.sex = params.sex ? params.sex : $(this).data('sex');
                    value.sex = value.sex ? value.sex : 'M';
                    var id = new Date().getTime().toString().slice(8);
                    if (value.name.length >= 3 && value.sub == 2) {
                        var html = '<div id="avatar-icon' + id + '">'  + value.name.substr(value.name.length - 2, value.sub) + '</div>';
                    } else {
                        var html = '<div id="avatar-icon' + id + '">'  + value.name.substr(0, value.sub) + '</div>';
                    }
                    style.backgroundColor = style.backgroundColor[0];
                    $(this).append(html);
                    $("#avatar-icon" + id).css(style);
                    console.log('头像生成成功！');
                } else if ($(this).length > 1) {
                    for (var i = 0; i < $(this).length; i++) {
                        value.url = params.url ? params.url : $($(this)[i]).find('img').attr('src');
                        if (value.url) {
                            $($(this)[i]).find('img').css(style);
                            console.log('元素长度' + $(this).length + ',本次是第' + (i + 1) + '次,操作为头像图片修正');
                            continue;
                        } else {
                            value.name = params.name ? params.name : $($(this)[i]).data('name');
                            value.name = value.name ? value.name : '未知';
                            value.sex = params.sex ? params.sex : $($(this)[i]).data('sex');
                            value.sex = value.sex ? value.sex : 'M';

                            if (value.name.length >= 3 && value.sub == 2) {
                                var html = '<div class="avatar-icon' + i + '">' + value.name.substr(value.name.length - 2, value.sub) + '</div>';
                            } else {
                                var html = '<div class="avatar-icon' + i + '">' + value.name.substr(0, value.sub) + '</div>';
                            }
                            if (style.backgroundColor.length == 1) {
                                style.backgroundColor = style.backgroundColor[0];
                            } else if (value.sex == 'M') {
                                style.backgroundColor = style.backgroundColor[0];
                            } else if (value.sex == 'F') {
                                style.backgroundColor = style.backgroundColor[1];
                            }
                            $($(this)[i]).append(html);
                        }
                        $('.avatar-icon' + i).css(style);
                        style.backgroundColor = $.isArray(params.bgColor) && params.bgColor.length > 0 && params.bgColor.length <= 2 ? params.bgColor : ['rgba(116,209,234,1)', 'rgba(252,174,187,1)'];
                        console.log('元素长度' + $(this).length + ',本次是第' + (i + 1) + '次,操作为头像生成');
                    }
                } else {
                    console.log('初始化失败');
                }
            } else {
                console.log('参数错误，请检查选择器或入参');
            }
        }
    })
})(jQuery);
