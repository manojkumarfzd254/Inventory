const toastr_success = (rq,mes) =>{
    rq.toastr.success(mes,"Success",{progressBar:true,closeButton:true}); 
}

const toastr_error = (rq,mes) =>{
    rq.toastr.error(mes,"Error",{progressBar:true,closeButton:true}); 
}
const toastr_info = (rq,mes) =>{
    rq.toastr.info(mes,"Info",{progressBar:true,closeButton:true}); 
}

const toastr_warning = (rq,mes) =>{
    rq.toastr.warning(mes,"Warning",{progressBar:true,closeButton:true}); 
}

module.exports = {toastr_success,toastr_error,toastr_info,toastr_warning}