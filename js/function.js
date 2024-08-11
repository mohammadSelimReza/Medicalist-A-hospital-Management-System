// carousel:


const loadServices = () =>{
    fetch("data/hospital_services.json")
    .then(res=>res.json())
    .then(data=>displayService(data));
}
const loadDoctors = (name = ' ') =>{
    fetch("data/hospital_doctors.json")
    .then(res=>res.json())
    .then(data=>{
        console.log(data.doctors);
        const doctors = data.doctors;
        const filterDoctor = doctors.filter(doctor => doctor.full_name.toLowerCase().includes(name.toLowerCase()));
        console.log(filterDoctor);
        displayDoctor(filterDoctor);
    })
}
const loadSpecialDoctors = (name = ' ') =>{
    fetch("data/hospital_doctors.json")
    .then(res=>res.json())
    .then(data=>{
        console.log(data.doctors);
        const doctors = data.doctors;
        const filterDoctor = doctors.filter(doctor => doctor.designation.toLowerCase().includes(name.toLowerCase()));
        console.log(filterDoctor);
        displayDoctor(filterDoctor);
    })
}
const loadDegiDoctors = (name = ' ') =>{
    fetch("data/hospital_doctors.json")
    .then(res=>res.json())
    .then(data=>{
        console.log(data.doctors);
        const doctors = data.doctors;
        const filterDoctor = doctors.filter(doctor => doctor.specialization.toLowerCase().includes(name.toLowerCase()));
        console.log(filterDoctor);
        displayDoctor(filterDoctor);
    })
}
const loadSpecializations = () =>{
    fetch("data/hospital_specialization.json")
    .then(res=>res.json())
    .then(data=>displaySpecialization(data))
}
const loadDesignation = () =>{
    fetch("data/hospital_designation.json")
    .then(res=>res.json())
    .then(data=>displayDesignation(data))
}

const loadReviews=()=>{
    fetch("data/hospital_reviews.json")
    .then(res=>res.json())
    .then(data=>displayReview(data))
}

const displayService = (services) => {
    services.forEach(service => {
        const serviceContainer = document.getElementById('service-container');
        const li = document.createElement('li');
        // li.className.add('w-72');
        li.innerHTML =  `
                                            <div class="card shadow rounded-t-lg border-2 rounded-b-lg flex flex-col justify-center items-center bg-white">
                        <div class="ratio ratio-1x1">
                            <img src=${service.picture_url} class="card-img-top w-96 h-96 rounded-t-lg" loading="lazy" alt="...">
                        </div>
                        <div class="card-body p-0 pt-2 mb-4">
                            <div>
                                <h3 class="flex-grow-1 h5 font-bold">${service.service_name} </h3>
                            </div>
                            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Learn more</a>
                        </div>
                    </div>
                        `
        serviceContainer.appendChild(li);
    });
}
const displayDoctor = (doctors) =>{
    const doctorContainer = document.getElementById('doctor-container');
    doctorContainer.innerHTML = '';
    // const doctordata = doctors.doctors
    doctors.forEach(doctor=>{
        
        const div = document.createElement('div')
        div.innerHTML = `
                        <div class="bg-white shadow-md rounded-lg p-6 text-center">
                            <img class="mx-auto rounded-full w-24 h-24 mb-4" src=${doctor.image} alt="Doctor Image">
                            <h2 class="text-teal-600 text-xl font-semibold">${doctor.full_name}</h2>
                            <p class="text-gray-600 font-medium mb-4">${doctor.designation}</p>
                            <p class="text-gray-500 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet hendrerit pretium nulla sed enim iaculis mi.</p>
                        </div>
                        `
        doctorContainer.appendChild(div)
    })
}
const displaySpecialization = (data) =>{
    const specializaion_field = data.specializations    ;
    specializaion_field.forEach(field => {
        const parentContainer = document.getElementById('specialization-container');
        const select = document.createElement('option');
        select.innerText=field.name;
        parentContainer.appendChild(select);
    });
}
const displayDesignation = (data) =>{
    const specializaion_field = data.designations    ;
    specializaion_field.forEach(field => {
        const parentContainer = document.getElementById('designation-container');
        const select = document.createElement('option');
        select.innerText=field.name;
        parentContainer.appendChild(select);
    });
}
const handleDoctorSerach = (event) =>{
    const input = document.getElementById('title');
    const inputValue = input.value;
    console.log(inputValue);
    loadDoctors(inputValue);
    input.value = "";
}

const handleSepecialSearch = (event) =>{
    const valuefield = document.getElementById('designation-container');
    const value = valuefield.value;
    console.log(value);
    loadSpecialDoctors(value);
}
const handleDesignationSearch = (event) =>{
    const valuefield = document.getElementById('specialization-container');
    const value = valuefield.value;
    console.log(value);
    loadDegiDoctors(value);
}
const resetFilter = () => {
    // Clear the dropdown selections
    document.getElementById('specialization-container').selectedIndex = 0;
    document.getElementById('designation-container').selectedIndex = 0;
    document.getElementById('title').value = "";

    // Reload all doctors
    loadDoctors();
}

const displayReview = (reviews) =>{
    const parentContainer = document.getElementById('review_container')
    reviews.forEach(review=>{
        console.log(review);
        const div = document.createElement('div');
        div.classList.add("flex", "justify-center");
        div.innerHTML = `
                        <div class="review-card">
                            <div class="review-header">
                                <div class="reviewer-details">
                                    <h4>${review.name}</h4>
                                    <div class="stars">
                                        &#9733; &#9733; &#9733; &#9733; &#9733; <!-- 5 Stars -->
                                    </div>
                                </div>
                            </div>
                            <div class="review-body">
                                <h5>“${review.doctor}”</h5>
                                <p>${review.body}</p>
                            </div>
                        </div>
                        `
        parentContainer.appendChild(div);
    })
}



document.getElementById('designation-container').addEventListener("change",handleSepecialSearch);
document.getElementById('specialization-container').addEventListener("change",handleDesignationSearch);
document.getElementById('reset-button').addEventListener('click', resetFilter);
loadServices();
loadDoctors();
loadSpecializations();
loadDesignation();
loadReviews();