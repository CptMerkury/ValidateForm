Vue.component('username-field', {
    template: `
     <div class="product">
        <h1>{{title}}</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius, eos inventore omnis quaerat quas quisquam
            rerum. Atque delectus dolores exercitationem facilis incidunt minima, neque officia provident quidem,
            sapiente similique soluta!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius, eos inventore omnis quaerat quas quisquam
            rerum. Atque delectus dolores exercitationem facilis incidunt minima, neque officia provident quidem,
            sapiente similique soluta</p>
    
    <user-info-form @form-send="addUserInfo"></user-info-form>
        <div class="username">
            <h2>Username info:</h2>
            <p v-if="!userInfo.length">Create username</p>
            <ul>
                <li v-for="item in userInfo">
                    <p>Name: {{item.name}}</p>
                    <p>Email: {{item.email}}</p>
                    <p>Number: {{item.number}}</p>
                </li>
            </ul>
        </div>
    </div>
    `,
    data() {
        return {
            userInfo: []
        }
    },
    methods: {
        addUserInfo(userArray) {
            this.userInfo.push(userArray)
            // fetch('/article/fetch/post/user', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json;charset=utf-8'
            //     },
            //     body: JSON.stringify(user)
            // });
            console.log(JSON.stringify(userArray))
        }
    },
    computed: {
        title() {
            return ('This page create username')
        }
    }
})


Vue.component('user-info-form', {
    template: `
     <form @submit.prevent="sendSubmit">
        <fieldset class="form">
            <h1>Write your information</h1>
            <p class='error' v-if="errors.length" >
                <b>Please correct the following error(s)</b>
            <ul>
                <li v-for="item in errors">{{item}}</li>
            </ul>
            </p>
            1. Name <input class="userInfo cap" v-model.number="name" type="text" placeholder="First Name">
            2. Email <input class="userInfo" v-model="email" type="text" placeholder="Email">
            3. Number <input class="userInfo" v-model.number="number" type="tel" placeholder="Number">
            4. Password <input class="userInfo" v-model="password" type="password" placeholder="Password">
            5. Confirm password <input class="userInfo" v-model="confirmPassword" type="password" placeholder="Password">
            <input type="submit" value="Send form">
        </fieldset>
    </form>
    `,
    data() {
        return {
            name: null,
            email: null,
            number: null,
            password: null,
            confirmPassword: null,
            errors: []
        }
    },
    methods: {
        sendSubmit() {
            this.errors = []
            if (this.name && this.email && this.number && this.password && this.confirmPassword && this.password === this.confirmPassword) {
                let userArray = {
                    name: this.name,
                    email: this.email,
                    number: this.number,
                    password: this.password,
                    confirmPassword: this.confirmPassword
                }
                this.$emit('form-send', userArray),
                    this.name = null,
                    this.email = null,
                    this.number = null,
                    this.password = null,
                    this.confirmPassword = null,
                    this.errors.length = 0

            } else {
                //Name valid
                if (!this.name) this.errors.push('Name required')
                if (this.name.length < 3) this.errors.push('Name not correct, min length 3 symbol')
                if (typeof this.name === 'number') this.errors.push('Name not correct, only letter symbol')
                if (isNaN(this.validName(this.name)) && typeof this.name !== 'string') this.errors.push('Name not correct')
                // //Email valid
                if (!this.email) {
                    this.errors.push('Email required')
                } else if (!this.validEmail(this.email))
                    this.errors.push('Please, write correct email')
                // //Number valid
                if (!this.number) {
                    this.errors.push('Number required')
                } else if (!this.validNumber(this.number)) {
                    this.errors.push('Please, write correct number')
                }
                if (typeof this.number === "string") this.errors.push('Number not correct, use only numeric symbol')
                // //Password valid
                if (!this.password) this.errors.push('Password required')
                if (!this.confirmPassword) this.errors.push('Confirm password required')
                if (this.password !== this.confirmPassword) this.errors.push('Password mismatch')
            }
        },
        validEmail(email) {
            let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email)
        },
        validName(name) {
            return Number(name)
        },
        validNumber(number) {
            let nu = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/
            return nu.test(number)
        }
    }
})

let app = new Vue({
    el: '#app',
})
