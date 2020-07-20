Vue.component('carousel', {
    template:
        `
    <section>
        <carousel-imgs
            :item="list[active]"
            :active="active"
            :trans="animationType"
        ></carousel-imgs>

        <carousel-control 
            :total="list.length" 
            :active="active"
            @prev="prevHandler"
            @next="nextHandler"
            @change="changeHandler"
            @enter="inHandler"
            @leave="outHandler"
        ></carousel-control>
        <change-animation-type @changeAnimationType="changeAnimationType" :trans="type"></change-animation-type>
    </section>
    `,
    data() {
        return {
            timeout:null,
            timeoutTime: 3000,
            type: 'trans',
            active: 0,
            transDirect: 0,
            list: [
                { id: 1, src: "./assets/images/cats/1.jpg" },
                { id: 2, src: "./assets/images/cats/2.jpg" },
                { id: 3, src: "./assets/images/cats/3.jpg" },
                { id: 4, src: "./assets/images/cats/4.jpg" },
                { id: 5, src: "./assets/images/cats/5.jpg" }
            ]
        }
    },
    mounted() {
        this.outHandler()
    },
    beforeDestory() {
        this.inHandler()
    },
    computed: {
        activePic() { return this.list[this.active] },
        activeStyle() { return { backgroundImage: `url("${this.activePic.src}")` } },
        trans() { return this.transDirect ? 'transx-to-right' : 'transx-to-left' },
        opacity() { return  'opacity'},
        animationType() {
            let aniType = '';
            switch (this.type) {
                case 'trans':
                    aniType = this.trans
                    break;
                case 'opacity':
                    aniType = this.opacity
                    break;
                default:
                    aniType = this.trans
                    break
            }
            return aniType
        }
    },
    methods: {
        next() {
            this.changeHandler(this.active + 1)
        },

        inHandler() {
            clearTimeout(this.timeout);
            console.log('clear')
        },
        outHandler() {

            // 確保所有計時器都已清除
            this.inHandler()
            this.timeout = setTimeout(this.timeoutHandler, this.timeoutTime)
        },
        timeoutHandler() {
            this.next()
            this.outHandler()
        },
        getPicStyle(item) {
            return {
                background: `url("${item.src}")`
            }
        },

        changeHandler(index) {
            if (this.active === index) return

            index > this.active ? this.transDirect = 1 : this.transDirect = 0
            this.active = (index + this.list.length) % this.list.length
        },

        prevHandler() {
            this.changeHandler(this.active - 1)
        },
        nextHandler() {
            this.changeHandler(this.active + 1)
        },
        changeAnimationType() {
            this.type === 'trans' ? this.type = 'opacity' : this.type = 'trans'
        }
    }
})

Vue.component('carouselImgs', {
    props: {
        item: {
            type: Object,
            required: true
        },
        active: {
            type: Number,
            required: true
        },
        trans: {
            type: String,
            default: 'transx-to-right'
        }
    },
    template:
        `
        <div class="container">
            <transition :name="trans">
                <div class="pic" :style="activeStyle" :key="item.id"></div>
            </transition>
        </div>
        `,
    computed: {
        activeStyle() { return `background-image: url('${this.item.src}')` },
    }


})

Vue.component('carouselControl', {
    props: {
        total: {
            type: Number,
            required: true
        },
        active: {
            type: Number,
            required: true
        }
    },
    template:
        `
    <div @mouseenter="inHandler" @mouseleave="outHandler">
        <div class="button" @click="prevHandler">prev</div>
        <div @click="changeHandler(num - 1)" 
            class="button" 
            :class="{active:active === num - 1}"
            v-for="num in total" 
            :key=" 'b' + num"
        >{{ num }}</div>
        <div class="button" @click="nextHandler">next</div>
    </div>
    `,
    methods: {
        changeHandler(index) {
            if (this.active === index) return
            this.$emit('change',index)
        },
        prevHandler() {
            this.$emit('prev')
        },
        nextHandler() {
            this.$emit('next')
        },
        inHandler() {
            console.log('enter')
            this.$emit('enter')
        },
        outHandler() {
            this.$emit('leave')
        },
    }

})

Vue.component('changeAnimationType',{
    props: {
        trans: {
            type: String,
            default: "(can't get animation type)"
        }
    },
    template: ` <div class="button" @click="changeAnimationType">Change Animation Type <p>{{ trans }}</p></div>`,
    methods: {
        changeAnimationType() { this.$emit('changeAnimationType')}
    }
})
