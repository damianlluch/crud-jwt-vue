<template>
        
        <div class="container-fluid">

        	<div class="d-sm-flex align-items-center justify-content-between mb-4">
            	<h1 class="h3 mb-0 text-gray-800">Patient list</h1>
            	<router-link class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" to='league/create'>
          			Create
        		</router-link>
          </div>
          
          
          <div class="card shadow mb-4">
            <div class="card-header py-3">
              <h6 class="m-0 font-weight-bold text-primary">List</h6>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-bordered" width="100%" cellspacing="0">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th>Surname</th>
                      <th>Birthdate</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="patient of patients">
                        <td>{{patient.id}}</td>
                        <td>{{patient.name}}</td>
                        <td>{{patient.surname}}</td>
                        <td>{{patient.birthdate}}</td>
                        <td><router-link :to="`/admin/league/edit/${patient.id}`">Edit</router-link></td>
                        <td><router-link :to="`/admin/league/delete/${patient.id}`">Delete</router-link></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
        
      
      

  
</template>

<script>
import axios from 'axios';

export default {
  	name: 'league-list',

  	data() {
    	return {
      		patients: [],
      		league1: ""
    	};
  	},

  	created() {
    
    	axios.get('http://localhost:8000/api/patients')
    		.then(response => {
      		this.patients = response.data.data
                console.log(this.patients, 'datos')
    	})
    	.catch(e => {
      		this.errors.push(e)
    	})
  	}
}
</script>
