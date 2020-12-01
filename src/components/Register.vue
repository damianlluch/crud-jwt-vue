<template>
<div>
<Header />
<div class="container">

    <div class="card o-hidden border-0 shadow-lg my-5">
      <div class="card-body p-0">
        
        <div class="row">
          <div class="col-lg-5 d-none d-lg-block bg-register-image"></div>
          <div class="col-lg-7">
            <div class="p-5">
              <div class="text-center">
                <h1 class="h4 text-gray-900 mb-4">Create an Account!</h1>
              </div>
              <form @submit="formSubmit" class="user">

                <p v-if="errors.length">
                  <b>Please correct the following error(s):</b>
                  <ul>
                    <li v-for="error in errors">{{ error }}</li>
                  </ul>
                </p>

                <div class="form-group row">
                  <div class="col-sm-6 mb-3 mb-sm-0">
                    <input type="text" class="form-control form-control-user" id="exampleFirstName" placeholder="First Name" v-model="name">
                  </div>
                </div>

                <div class="form-group">
                  <input class="form-control form-control-user" type="text" v-model="email" placeholder="Email">
                </div>
                <div class="form-group">
                  <input class="form-control form-control-user" type="password" v-model="password" placeholder="Password">
                </div>
                <div class="form-group">
                  <input class="form-control form-control-user" type="password" v-model="passwordConfirmation" placeholder="Password confirmation">
                </div>

                <button class="btn btn-primary btn-user btn-block">Register</button>
              </form>
              <hr>
              <div class="text-center">
                  <router-link class="small" to='login'>
                      Already have an account? Login!
                  </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import Vue from 'vue';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';
 
Vue.use(VueToast);
Vue.component('Header', function (resolve) {
  require(['./Header'], resolve)
})

export default {
    name: 'registration',

  	data() {
    	return {
          name: "",
          email: "",
          password: "",
          passwordConfirmation: "",
          output: "",
          errors: []
    	};
  	},
    component(){
        BToast
    },
  	methods: {
    	formSubmit(e) {
          e.preventDefault();
      		let self = this;

          this.errors = [];

          if (!this.name) {
              this.errors.push('Name required.');
          } else if (this.name.length < 3 || this.name.length > 20) {
              this.errors.push('Firstname length between 3 and 20.');
          }  if (!this.email) {
              this.errors.push('Email required.');
          } else if (!this.validEmail(this.email)) {
              this.errors.push('Valid email required.');
          } if (!this.password) {
              this.errors.push('Password required.');
          } else if(!this.passwordConfirmation) {
              this.errors.push('Password confirmation required.');
          } if (this.passwordConfirmation !== this.password) {
            this.errors.push('The password confirmation is incorrect');
          }
      		
          if(!this.errors.length){
          		axios.post('http://localhost:8000/api/register', {
                name: this.name,
                email: this.email,
                password: this.password,
                c_password: this.password
          		})
          		.then(function (response) {
                  Vue.$toast.open({
                      message: response.data.message,
                      type: "success",
                      duration: 10000,
                      dismissible: true,
                      position: "top-right"
                  });
          			  self.output = response.data.message;
          			  if(response.data.code == 200){
          				    self.$router.push('/login');
          			  }
          		})
          		.catch(function (error) {
            		self.output = error;
          		});
          }
    	},
      validEmail: function (email) {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      }
  	}
}
</script>
