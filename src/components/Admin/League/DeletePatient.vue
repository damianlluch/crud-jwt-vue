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
                                        <h1 class="h4 text-gray-900 mb-4">Delete Patient</h1>
                                    </div>
                                    <form class="user" @submit="formSubmit">
                                        <button class="btn btn-primary btn-user btn-block">Delete</button>
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
    import axios from "axios";
    import Vue from "vue";

    export default {
        name: "DeletePatient",
        methods: {
            formSubmit(e) {
                let self = this;
                let id = this.$route.params.id;
                e.preventDefault();
                axios.delete('http://localhost:8000/api/patients/'+id)
                    .then(function (response) {

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
        }
    }
</script>

<style scoped>

</style>
