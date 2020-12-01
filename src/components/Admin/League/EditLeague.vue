<template>
  <div class="container">  
      
        <div class="row justify-content-center">
          <div class="col-xl-10 col-lg-12 col-md-9">
            <div class="card o-hidden border-0 shadow-lg my-5">
              <div class="card-body p-0">
                
                <div class="row">
                  <div class="col-lg-12">
                    <div class="p-5">
                      <div class="text-center">
                        <h1 class="h4 text-gray-900 mb-4">Update Patient</h1>
                      </div>
                      <form class="user" @submit="formSubmit">
                        <p v-if="errors.length">
                          <b>Please correct the following error(s):</b>
                          <ul>
                            <li v-for="error in errors">{{ error }}</li>
                          </ul>
                        </p>
                        <div class="form-group">
                          <input type="text" class="form-control form-control-user" v-model="name" aria-describedby="emailHelp" placeholder="Enter Name">
                        </div>
                        <div class="form-group">
                          <input type="text" class="form-control form-control-user" v-model="surname" aria-describedby="emailHelp" placeholder="Enter surname">
                        </div>
                        <div class="form-group">
                          <input type="date" class="form-control form-control-user" v-model="birthDate" aria-describedby="emailHelp" placeholder="Enter birthdate">
                        </div>
                        <button class="btn btn-primary btn-user btn-block">Update</button>
                      </form>
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

export default {

  data() {
    return {
      name: "",
      surname: "",
      birthDate: "",
      output: "",
      errors: []
    };
  },
  component(){
      BToast
  },
  methods: {

    getLeague() {
      let self = this;
      let id = this.$route.params.id;
      
      axios.get('http://localhost:8000/api/patients/'+id)
      .then(function (response) {
        this.name = response.data.data.name;
        this.surname = response.data.data.surname;
        this.birthDate = response.data.data.birthDate;
      })
      .catch(function (error) {
        self.output = error;
      });
    },

    formSubmit(e) {
      let self = this;
      let id = this.$route.params.id;
      e.preventDefault();
      
      self.errors = [];
      if (!self.name) {
          self.errors.push('Name required.');
      }

      axios.put('http://localhost:8000/api/patients/'+id, {
        name: this.name, surname: this.surname, birth: this.birthDate
      })
      .then(function (response) {
        this.name = response.data.data.name;
        this.surname = response.data.data.surname;
        this.birthDate = response.data.data.birthDate;

          if(response.data.code == 200){
              Vue.$toast.open({
                  message: response.data.message,
                  type: "success",
                  duration: 10000,
                  dismissible: true,
                  position: "top-right"
              });
              self.$router.push('/admin/index');
          }
      })
      .catch(function (error) {
          self.output = error;
      });
    }
  },

  created() {
      this.getLeague();
  }
}
</script>
<style>
table, th, td { 
    border: 1px solid black; 
    border-collapse: collapse; 
} 
  
th, td { 
    padding: 20px; 
} 
  
th { 
    text-align: left; 
}
</style>
