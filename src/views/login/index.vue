<template>
  <div
    class="login-container"
    :style="'background:url(' + require('@/assets/login_bg.jpg') + ');'"
  >
    <div class="starsView">
      <!-- 动态星星背景 -->
      <div class="stars">
        <div
          v-for="(item, index) in starsCount"
          :key="index"
          ref="star"
          class="star"
        />
      </div>
      <!-- 登录框 -->
      <div class="logingview">
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
          auto-complete="on"
          label-position="left"
        >
          <div class="title-container">
            <h3 class="title">领云电力交易平台</h3>
          </div>

          <el-form-item prop="username">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input
              ref="username"
              v-model="loginForm.username"
              placeholder="用户名"
              name="username"
              type="text"
              tabindex="1"
              auto-complete="on"
            />
          </el-form-item>

          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="密码"
              name="password"
              tabindex="2"
              auto-complete="on"
              @keyup.enter.native="handleLogin"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon
                :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
              />
            </span>
          </el-form-item>
          <el-checkbox v-model="agreeToSignIn">
            <span
              class="flex margin-top"
              style="font-size: 12px; color: #ccc; justify-content: flex-start"
            >用户已阅读并同意:
              <el-link
                style="font-size: 12px"
                type="primary"
                class="text-bold"
                @click="showUserSever"
              >《领云电力交易平台用户服务协议》</el-link></span>
          </el-checkbox>

          <!-- <el-button
            type="info"
            style="
              width: 100%;
              margin: 0;
              margin-top: 15px;
              margin-bottom: 30px;
            "
            @click="handleFullScreen"
          >
            {{ isFullscreen ? '退出全屏' : '进入全屏' }}
          </el-button> -->
          <el-button
            :loading="loading"
            type="primary"
            style="width: 100%; margin-top: 30px; margin-bottom: 30px"
            @click.native.prevent="handleLogin"
          >
            立即登录
          </el-button>

          <div class="tips">
            <span> 系统版本：{{ version }}</span>
          </div>
        </el-form>
      </div>
      <!-- logo -->
      <div class="logoView">
        <img :src="logoSrc" class="logo" alt="江苏领云能源科技有限公司">
        <!-- <div class="title">{{ logoTitle }}</div> -->
      </div>
      <!-- 版权信息 -->
      <div class="copyrightView">
        <span>版权所有 © 2021 江苏领云能源科技有限公司 ·
          苏ICP备2020070464号-1</span>
      </div>
    </div>
  </div>
</template>

<script>
// import { validUsername } from '@/utils/validate'
import { SYSTEM_CONFIG } from '@/utils/config'
import screenfull from 'screenfull'
import { MessageBox } from 'element-ui'
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length <= 0) {
        callback(new Error('用户名不能为空'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于6位'))
      } else {
        callback()
      }
    }
    return {
      agreeToSignIn: false,
      starsCount: 800,
      distance: 800,
      logoSrc: SYSTEM_CONFIG.logoWhite,
      version: SYSTEM_CONFIG.version,
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      isFullscreen: false
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  mounted() {
    this.init()
    const starArr = this.$refs.star
    starArr.forEach((item) => {
      const speed = 0.2 + Math.random() * 1
      const thisDistance = this.distance + Math.random() * 300
      item.style.transformOrigin = `0 0 ${thisDistance}px`
      item.style.transform = `translate3d(0, 0, -${thisDistance}px) rotateY(${
        Math.random() * 360
      }deg) rotateX(${Math.random() * -50}deg) scale(${speed}, ${speed})`
    })
  },
  methods: {
    init() {
      if (screenfull.isEnabled) {
        screenfull.on('change', this.change)
      }
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/' })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    showUserSever() {
      const msg = `<p>
	<p class="MsoNormal" style="text-align:center;">
		<strong><span style="font-size:24px;">《用户服务协议<strong><span style="font-size:24px;">》</span></strong></span></strong>
	</p>
	<p class="MsoNormal" style="text-align:center;">
		<span style="font-size:18px;"></span>
	</p>
	<p class="MsoNormal" style="text-align:center;">
		<br />
	</p>
	<p class="MsoNormal">
		本《领云电力交易平台用户服务协议》（以下简称“本服务协议”）是您与领云之间就领云授权账号及使用领云的各项服务等相关事宜所订立的协议。为使用领云的服务，您应当仔细阅读并遵守本服务协议下的全部内容。除非您已阅读并接受本服务协议所有条款，否则您将不能使用领云的服务。如您对本服务协议的内容（特别是涉及免除或者责任限制的条款）有任何疑义，可随时按照本服务协议中列明的联系方式与我们联系，我们将根据您的要求为您进一步解释和说明相关内容。如您勾选“我同意《领云电力交易平台用户服务协议》，即视为您已阅读并同意本服务协议，自愿接受本服务协议的所有内容的约束。
	</p>
	<p class="MsoNormal">
		&nbsp;
	</p>
	<p class="MsoNormal">
		<br />
	</p>
	<p class="MsoNormal">
		一、协议的主体与范围
	</p>
	<p class="MsoNormal">
		<br />
	</p>
	<p class="MsoNormal">
		【签约主体】 视您所使用的具体服务而定，“领云”是指江苏领云能源科技有限公司旗下运营或提供您所使用的相关具体服务的相关主体的统称。
	</p>
	<p class="MsoNormal">
		“用户”是指使用领云相关服务的使用人，在本服务协议中更多称呼为“您”。
	</p>
	<p class="MsoNormal">
		<br />
	</p>
	<p class="MsoNormal">
		【协议内容】本服务协议内容同时包括：
	</p>
	<p class="MsoNormal">
		（1） 本《领云用户服务协议》文本；
	</p>
	<p class="MsoNormal">
		（2）具体服务的服务条款：您的领云平台账号一经授权，即可凭该账号登录享受领云平台上的各项丰富的服务。为更好地向您提供各项服务，领云平台针对具体的服务制定了专门的服务条款，供服务各方遵守。您在使用具体服务前，应仔细阅读该服务所适用的服务条款，您注册领云账号并利用领云账号使用具体服务即表示您已同时接受该等服务条款，并将受该等服务条款的约束；
	</p>
	<p class="MsoNormal">
		（3）第三方服务相关的用户授权协议。为方便您在使用领云平台服务的同时，根据您自身需要，通过领云平台进行跳转等方式，自愿选择接受独立第三方服务商及部分关联第三方服务商所提供的服务，您将在使用该等第三方服务前对相应的用户授权协议予以同意确认，以作为您和领云平台之间就该等第三方服务的使用所涉及的相关事项的权利义务依据。
	</p>
	<p class="MsoNormal">
		上述各项内容之间如存在不一致之处，以时间上最新发布的内容为准。
	</p>
	<p class="MsoNormal">
		&nbsp;
	</p>
	<p class="MsoNormal">
		【协议遵守】您理解并同意：
	</p>
	<p class="MsoNormal">
		（1）上述【协议内容】中所述的协议、政策、条款与规则构成本服务协议不可分割的组成部分，共同适用于您所使用的领云平台服务。
	</p>
	<p class="MsoNormal">
		（2）根据国家法律法规变化、运营需要或为提升服务质量的目的，领云将在必要的时候对上述各项协议、条款与规则不时地进行修改更新，并通过在网页端上发出公告提前通知，上述修改更新内容将在相关更新说明发布会即时开始实施。
	</p>
	<p class="MsoNormal">
		（3） 您应当及时查阅并了解相关更新修改内容，如您不同意相关更新修改内容，可停止使用相关更新修改内容所涉及的服务，此情形下，变更事项对您不产生效力；如您在上述更新修改内容实施后继续使用所涉及的服务，将视为您已同意各项更新修改内容。
	</p>
	<p class="MsoNormal">
		<br />
	</p>
	<p class="MsoNormal">
		【适用平台】本服务协议适用于网页端中领云所提供的各项服务。您知悉并理解，为享受上述相关服务，您必须自行提供相关上网设备（如：个人电脑、CA证书或其他设备）并自行负担相关网络使用和商品服务支付所产生的有关费用。
	</p>
	<p class="MsoNormal">
		<br />
	</p>
	<p class="MsoNormal">
		<br />
	</p>
	<p class="MsoNormal">
		&nbsp;二、账号的注册
	</p>
	<p class="MsoNormal">
		<br />
	</p>
	<p class="MsoNormal">
		【注册资料】您应遵循诚实信用、合法善意的原则，向领云提交相关注册资料，由领云为您完成相关注册配置，相关注册资料应当遵守法律法规、社会主义制度、国家利益、公民合法权益、公序良俗、信息真实等原则，不应提交任何违法或不良信息，相关资料如有变动，您应及时通知领云修改维。如果因您所提供的注册资料不合法、不真实、不准确或未及时更新，从而导致相关法律责任或不利后果的，您将承担相应的法律责任及不利后果。
	</p>
	<p class="MsoNormal">
		<br />
	</p>
	<p class="MsoNormal">
		【注册信息保护】领云将对您所提交的注册信息予以保护，不会将其披露给任何非关联的第三方，除非：
	</p>
	<p class="MsoNormal">
		（1）相关法律法规或国家机关要求；
	</p>
	<p class="MsoNormal">
		（2）领云发生相关合并、分立、收购或资产转移；或
	</p>
	<p class="MsoNormal">
		（3）为提供相关服务所必须的。
	</p>
	<p class="MsoNormal">
		对于您所提交的注册信息中涉及个人信息的内容，领云将严格按照《领云隐私政策》的规定进行收集、处理和使用。
	</p>
	<p class="MsoNormal">
		<br />
	</p>
	<p class="MsoNormal">
		<br />
	</p>
	<p class="MsoNormal">
		三、 账号的使用
	</p>
	<p class="MsoNormal">
		<br />
	</p>
	<p class="MsoNormal">
		【账号使用】您应对您账号项下的所有行为（包括但不限于在线签署任何协议，浏览、统计、CA证书授权、读取CA授权范围内的所有交易中心信息、交易、结算、短信通知、发布、输入任何内容）所产生的一切后果负责，通过您的账号所发生的上述各项行为将视为您本人的真实意思表示。您同意授权领云作为服务商为您提供电力市场包括但不限于数据支持、交易窗口、结算平台、数据分析平台等功能，并同意领云作为您(CA授权合规用户)合法合规访问电力交易中心的数据平台。
	</p>
	<p class="MsoNormal">
		<br />
	</p>
	<p class="MsoNormal">
		【账号借用】为保证相关账号安全，未经领云的书面同意，您不应将领云平台上所注册的账号借给他人或其他工商主体使用，否则您应当承担由此产生的全部责任，领云平台保留拒绝提供相应服务、冻结或收回注册账号或终止本服务协议的权利，并可要求您对领云所承受的损失予以赔偿。
	</p>
	<p class="MsoNormal">
		<br />
	</p>
	<p class="MsoNormal">
		【安全义务】如您发现账号存在安全问题，请您立即联系领云予以调查处理，否则领云对潜在损失的产生或扩大不承担任何责任。
	</p>
	<p class="MsoNormal">
		<br />
	</p>
	<p class="MsoNormal">
		<br />
	</p>
	<p class="MsoNormal">
		四、用户行为规范与责任承担
	</p>
	<p class="MsoNormal">
		<br />
	</p>
	<p class="MsoNormal">
		【用户义务】您知悉并承诺，在使用领云所提供的服务的过程中，您应遵守相关法律法规，不应从事如下违反法律法规的规定，影响正常服务提供或损害他人合法利益的行为：
	</p>
	<p class="MsoNormal">
		（1） 不应利用领云平台或相关服务危害国家安全、破坏政治稳定、泄露国家秘密，不侵犯国家、社会、集体利益和第三方的合法权益，不从事违法犯罪活动，不设立用于实施诈骗，传授犯罪方法，制作或者销售违禁物品、管制物品等违法犯罪活动的网站、通讯群组，不利用网络发布涉及实施诈骗，制作或者销售违禁物品、管制物品以及其他违法犯罪活动的信息；
	</p>
	<p class="MsoNormal">
		（2）不应制作、发布、复制、查阅和传播、存储、链接下列信息：反对宪法所确定的基本原则的；危害国家安全，泄露国家秘密，颠覆国家政权，推翻社会主义制度，煽动分裂国家，破坏国家统一的；损害国家荣誉和利益的；煽动民族仇恨、民族歧视，破坏民族团结的；破坏国家宗教政策，宣扬邪教和封建迷信的；煽动非法集会、结社、游行、示威、聚众扰乱社会秩序的；捏造、散布谣言，侵犯他人权利，扰乱经济、社会秩序，破坏社会稳定的；散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；侮辱或者诽谤他人，侵害他人合法权益的；宣扬恐怖主义、极端主义的；违背当地风俗习惯的；含有法律、行政法规禁止的其他内容的；
	</p>
	<p class="MsoNormal">
		（3） 不应从事下列危害计算机信息网络安全的活动：对网络服务及相关软硬件设施进行破解、破坏、删除、修改或者增加的；对计算机信息网络中存储或者传输的数据和应用程序进行删除、修改或者增加的；使用软件或硬件等方式窃取他人口令、非法入侵他人计算机系统；故意制作、传播计算机病毒等破坏性程序的；其他危害计算机信息网络安全的活动；
	</p>
	<p class="MsoNormal">
		（4）不应擅自复制和使用网络上未公开和未授权的文件。除相关著作权人明示同意，不应在网络中擅自破解、传播、下载或复制第三人享有著作权的软件或进行其他任何侵害他人知识产权的活动；
	</p>
	<p class="MsoNormal">
		（8）未经领云事先书面许可，不应自行或授权、协助任何第三方非法抓取领云所展示的任何内容（“非法抓取”是指采用未经领云认可的程序或者非正常浏览等技术手段获取内容数据的行为）。
	</p>
	<p class="MsoNormal">
		<br />
	</p>
	<p class="MsoNormal">
		【责任承担】如您在使用领云服务过程中涉及上述行为中的一项或多项，则需要对自己的行为承担法律责任。承担法律责任的形式包括但不限于：对受到侵害者进行赔偿，以及在领云首先承担了因您的行为导致的行政处罚或侵权损害赔偿责任等损失（含诉讼费、律师费等相关法律程序费用）后，您应立即给予领云等额的赔偿。此外，根据具体违法违规情形，领云有权作出独立判断，立即暂停或终止对您提供部分或全部服务，包括锁定、注销、删除帐号等措施。
	</p>
	<p class="MsoNormal">
		您知悉并理解，如果领云发现您的上述违法违规行为，依据相关法律法规的规定，领云有权或有义务立即停止相关服务，删除或屏蔽相关违规信息、服务评价，并视情况进行调查取证，保存有关记录，或向国家有关机关举报。同时，领云有权自主删除、屏蔽含有该内容的任何数据信息。领云将根据国家相关法律法规要求，对依法删除、屏蔽的数据信息予以记录、保存。
	</p>
	<p class="MsoNormal">
		<br />
	</p>
	<p class="MsoNormal">
		【使用目的】除非在特定服务条款或规则中您与领云另有约定或领云另行予以书面同意，您将确保本服务协议下的服务仅为您个人非商业性质的使用。未经领云书面同意，您不得使用未经领云授权的任何插件、外挂或第三方工具对本服务协议下的服务进行干扰、破坏、修改或施加其他影响。
	</p>
	<p class="MsoNormal">
		<br />
	</p>
	<p class="MsoNormal">
		<br />
	</p>
	<p class="MsoNormal">
		五、《领云隐私政策》
	</p>
	<p class="MsoNormal">
		&nbsp;
	</p>
	<p class="MsoNormal">
		（1）领云相关产品/服务，均适用本隐私服务《领云隐私政策》，领云非常重视您的个人信息和隐私的保护，将按照《领云隐私政策》中所公布的政策在具体服务中进行隐私及个人信息的收集、存储、使用、披露等活动。您在使用领云账号前，应仔细阅读《领云隐私政策》；
	</p>
	<p class="MsoNormal">
		（2）日志信息。当您使用我们提供的产品/服务时，我们会收集您的浏览、交易、结算、操作等信息并作为有关数据日志进行保存，其中包括访问的日期和时间、网络请求等，领云会严守客户隐私信息；
	</p>
	<p class="MsoNormal">
		（3）信息披露，您授权领云将有关数据日志进行脱敏、数据整合后，在不侵犯客户隐私前提下，作为大数据的一部分适时进行披露。
	</p>
	<p class="MsoNormal">
		&nbsp;
	</p>
	<p class="MsoNormal">
		&nbsp;
	</p>
	<p class="MsoNormal">
		六、知识产权
	</p>
	<p class="MsoNormal">
		<br />
	</p>
	<p class="MsoNormal">
		【知识产权】您理解并知悉，除另有书面声明以外，以下信息和内容的知识产权（包括但不限于专利权、著作权、商标权及商业秘密）归领云所有：
	</p>
	<p class="MsoNormal">
		1、 在领云相关服务中所提供的内容和信息（包括但不限于软件、技术、程序、网页、文字、图片、图像、地图、图标、音频、视频、图表、版面设计、电子文档、数据资料等）；
	</p>
	<p class="MsoNormal">
		2、领云用于提供上述内容和信息的基础设施和平台（包括但不限于软件、网站、应用程序等）；
	</p>
	<p class="MsoNormal">
		3、在领云提供相关服务中所使用的各项商标、商业形象、商业标识、技术诀窍、标语、文案等；
	</p>
	<p class="MsoNormal">
		4、领云平台服务的开发、运营、维护等过程中产生的所有数据和信息。
	</p>
	<p class="MsoNormal">
		领云所拥有的上述权利及所提供服务中所包含的任何内容的知识产权均受到法律保护，未经领云事先书面许可，您承诺不应且不应允许或协助任何人以任何形式（包括但不限于通过任何机器人、蜘蛛、截屏等程序或设备）进行使用、出租、出借、分发、展示、复制、修改、链接、转载、汇编、发表、出版、抓取、监视、引用或创造相关衍生作品。
	</p>
	<p class="MsoNormal">
		<br />
	</p>
	<p class="MsoNormal">
		【软件使用禁止性规定】除非领云书面许可，您在使用领云的软件时不得从事下列任一行为：
	</p>
	<p class="MsoNormal">
		（1）删除、编辑或遮挡软件及其副本上关于著作权、商标或其他权利标识或标记的信息；
	</p>
	<p class="MsoNormal">
		（2）复制、发布、出售或出租软件或其任何部分；
	</p>
	<p class="MsoNormal">
		（3）对软件进行反向工程、反向汇编、反向编译，或者以其他方式尝试挖掘、提取软件的源代码；
	</p>
	<p class="MsoNormal">
		（4） 其他对软件、软件所产生的数据所进行的任何增加、删减、变动的任何行为，包含制作、利用、授权各种第三方外挂、插件、系统进行上述行为。
	</p>
	<p class="MsoNormal">
		<br />
	</p>
	<p class="MsoNormal">
		<br />
	</p>
	<p class="MsoNormal">
		七、协议的终止
	</p>
	<p class="MsoNormal">
		<br />
	</p>
	<p class="MsoNormal">
		【协议终止情形】本服务协议于以下任一情形下终止：
	</p>
	<p class="MsoNormal">
		（1）领云有权依据本服务协议约定，收回、注销用户账号，此情形下，本服务协议于账号收回、注销之日终止；
	</p>
	<p class="MsoNormal">
		（2）领云有权根据自身商业安排经过合理的提前通知终止全部领云平台服务，本服务协议于领云平台全部服务依法定程序及方式终止之日终止。
	</p>
	<p class="MsoNormal">
		本服务协议终止后，领云将无法继续向您提供任何服务或履行任何其他义务，包括但不限于为您保留或向您披露其原领云账号中的任何信息。
	</p>
	<p class="MsoNormal">
		本服务协议的终止不影响第六条知识产权条款以及其他根据其内容应继续有效的条款的有效性，也不影响本服务协议终止前各方的相关权利和义务，包括但不限于守约方依据本服务协议向违约方追究相应的违约责任。
	</p>
	<p class="MsoNormal">
		&nbsp;
	</p>
	<p class="MsoNormal">
		<br />
	</p>
	<p class="MsoNormal">
		八、通知与送达
	</p>
	<p class="MsoNormal">
		您知悉并认可，领云可视情况通过下列任意一种或几种方式向您通知重要信息：
	</p>
	<p class="MsoNormal">
		（1）向您注册时所提交的电子邮箱地址发送电子信息；
	</p>
	<p class="MsoNormal">
		（2）向您注册时所提交的手机号码发送电子信息；
	</p>
	<p class="MsoNormal">
		（3）向您提供的实际地址进行寄送纸质载体信息；
	</p>
	<p class="MsoNormal">
		（4）在网站或客户端显著位置刊登电子信息；
	</p>
	<p class="MsoNormal">
		（5）向领云网站或相应客户端的账户的站内信或其他即时通信客户端发送电子信息。
	</p>
	<p class="MsoNormal">
		上述电子信息在发送成功或刊登完成后即视为送达。相关纸质载体的发送以相关邮寄凭证上的邮寄日期后的第五个自然日视为送达。
	</p>
	<p class="MsoNormal">
		上述送达方式同样可适用于相关仲裁或司法程序（含起诉、审理、执行等各阶段）。
	</p>
	<p class="MsoNormal">
		您应当保证所提供的联系方式是准确、有效的，并进行适时更新，如因提供的联系方式不准确或怠于更新等不可归责于领云的原因，导致相关通知、文件、文书无法送达或及时送达，您将自行承担由此可能产生的法律后果。
	</p>
	<p class="MsoNormal">
		<br />
	</p>
	<p class="MsoNormal">
		<br />
	</p>
	<p class="MsoNormal">
		九、不可抗力或其他免责事由
	</p>
	<p class="MsoNormal">
		<br />
	</p>
	<p class="MsoNormal">
		【不可抗力】您理解并同意，在使用本服务的过程中，可能会遇到不可抗力等风险因素，使本服务协议下的服务发生中断或终止。不可抗力是指不能预见、不能克服并不能避免且对一方或双方造成重大影响的客观事件，包括但不限于信息网络设备维护、信息网络连接故障、电脑、通讯或其他系统的故障、电力故障、罢工、劳动争议、暴乱、起义、骚乱、生产力或生产资料不足、火灾、洪水、风暴、爆炸、战争、政府行为、法律法规变动、司法行政机关的命令、其他不可抗力或第三方的不作为而造成的不能服务或延迟服务等行为。出现上述情况时，领云将努力在第一时间与相关部门配合，及时进行修复，但是由此给您造成的损失，领云在法律允许的范围内免责。
	</p>
	<p class="MsoNormal">
		<br />
	</p>
	<p class="MsoNormal">
		【其他免责事由】您理解并同意，在符合法律规定的情况下，领云对以下事由所导致的服务中断或终止不承担责任：
	</p>
	<p class="MsoNormal">
		（1）受到计算机病毒、木马或其他恶意程序、黑客攻击的破坏；
	</p>
	<p class="MsoNormal">
		（2）用户或领云的电脑软件、系统、硬件和通信线路出现故障；
	</p>
	<p class="MsoNormal">
		（3）用户操作不当；
	</p>
	<p class="MsoNormal">
		（4）用户通过非正常授权的方式使用本服务；
	</p>
	<p class="MsoNormal">
		（5）其他领云无法控制或合理预见的情形。
	</p>
	<p class="MsoNormal">
		&nbsp;
	</p>
	<p class="MsoNormal">
		【信息真实性】领云提示您，在使用本服务的过程中，您可能会遇到网络信息或其他用户行为带来的风险，该等风险包含他人匿名或冒名的含有威胁、诽谤、令人反感、非法、误导、欺骗等任何信息或行为所造成任何心理、生理上的伤害或经济损失。请您仔细甄别，并在遇到上述相关不法行为时及时向领云或有关机关举报或投诉。领云将对相关内容开展日常检查并在收到举报或投诉时进行相应处理，但请您注意，领云不对非领云所发出或刊登的任何信息的真实性、适用性、合法性承担责任，也不对因第三方侵权行为给您造成的损害负责。
	</p>
	<p class="MsoNormal">
		<br />
	</p>
	<p class="MsoNormal">
		【责任限制】除非另有明确书面说明，在符合法律法规规定的情况下，领云不对其网站和客户端上的信息、内容、材料、产品或服务做任何形式的明示或默示的声明或担保
	</p>
	<p class="MsoNormal">
		&nbsp;
	</p>
	<p class="MsoNormal">
		<br />
	</p>
	<p class="MsoNormal">
		十、管辖、法律适用与争议解决
	</p>
	<p class="MsoNormal">
		本服务协议的成立、生效、履行、解释与纠纷解决，适用中华人民共和国大陆地区法律法规，并且排除一切冲突法规定的适用。
	</p>
	<p class="MsoNormal">
		如因某项具体服务中的产品或服务问题导致您与领云间出现纠纷，您同意，该等纠纷将由适用于该项具体服务的服务条款或规则中所规定的争议解决地的有管辖权人民法院受理。就本服务协议而言，如您因本服务协议文本与领云产生争议纠纷，您同意交由本服务协议签订地有管辖权人民法院受理。本服务协议签订地为江苏省苏州市吴中区。
	</p>
	<p class="MsoNormal">
		【可分性】如果本服务协议中任何一条被视为废止、无效或因任何理由不可执行，该条应视为可分的且并不影响任何其余条款的有效性和可执行性。
	</p>
	<p class="MsoNormal">
		<br />
	</p>
	<p class="MsoNormal">
		如您对本服务协议有任何问题或建议，请在工作时间联系领云客服部门（领云•能源科技&nbsp;&nbsp;&nbsp;联系方式：0512-66562700）。
	</p>
<span></span>
</p>`
      MessageBox.alert(msg, '', {
        dangerouslyUseHTMLString: true,
        customClass: 'leeAlert userAgreement',
        confirmButtonText: '关闭',
        closeOnPressEscape: true,
        closeOnClickModal: true,
        callback: function(_) {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
input:-internal-autofill-selected {
  -webkit-text-fill-color: #666666 !important;
  transition: background-color 5000s ease-in-out 0s !important;
}
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;
@keyframes rotate {
  0% {
    transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(0);
  }
  100% {
    transform: perspective(400px) rotateZ(20deg) rotateX(-40deg)
      rotateY(-360deg);
  }
}

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  overflow: hidden;
  background-size: cover;
  background-attachment: fixed;
  background-position: center center;
  .starsView {
    overflow: hidden;
    position: relative;
    height: 100vh;
    width: 100vw;
    .stars {
      transform: perspective(500px);
      transform-style: preserve-3d;
      position: absolute;
      perspective-origin: 50% 100%;
      left: 50%;
      animation: rotate 90s infinite linear;
      bottom: 0;
      .star {
        width: 2px;
        height: 2px;
        background: #eeeeee;
        position: absolute;
        top: 0;
        left: 0;
        backface-visibility: hidden;
      }
    }
  }
  .logingview {
    position: absolute;
    width: 400px;
    top: 6rem;
    right: 10rem;
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;

        &:-webkit-autofill {
          // box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
  .logoView {
    position: absolute;
    top: 4rem;
    left: 4rem;
    width: 100%;
    color: $light_gray;
    display: flex;
    .logo {
      height: 80px;
    }
  }
  .copyrightView {
    position: absolute;
    bottom: 4rem;
    width: 100%;
    text-align: center;
    color: $light_gray;
  }
}
$bg: #25303d;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  .login-form {
    box-shadow: -15px 15px 15px rgb(6 17 47 / 70%);
    position: relative;
    width: 400px;
    max-width: 100%;
    padding: 30px;
    margin: 0 auto;
    margin-top: 160px;
    transform-origin: 161px 100%;
    transform: rotateX(0deg);
    transition-property: transform, opacity, box-shadow, top, left;
    overflow: hidden;
    background-image: linear-gradient(230deg, #35394a00 0%, #000000 150%);
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    text-align: right;
    span {
      text-align: center;
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
