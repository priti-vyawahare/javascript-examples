// mouse circle function//
const mousecircle = document.querySelector(".mouse-circle");
const mousedot = document.querySelector(".mouse-dot");

const mousecirclefn = (x, y) => {
  mousecircle.style.cssText = `top:${y}px; left:${x}px; opacity:1`;
  mousedot.style.cssText = `top:${y}px;left:${x}px; opacity:1`;
};
//end of mouse circle function//

//animated circle//
const circles = document.querySelectorAll(".circle");
const mainImg = document.querySelector(".main-circle img");

var mX = 0;
var mY = 0;
const z = 100;
const animcircle = (e, x, y) => {
  if (x < mX) {
    circles.forEach(circle => {
      circle.style.left = `${z}px`;
    });
    mainImg.style.left = `${z}px`;
  } else if (x > mX) {
    circles.forEach(circle => {
      circle.style.left = `-${z}px`;
    });
    mainImg.style.left = `-${z}px`;
  }

  if (y < mY) {
    circles.forEach(circle => {
      circle.style.top = `${z}px`;
    });
    mainImg.style.top = `${z}px`;
  } else if (y > mY) {
    circles.forEach(circle => {
      circle.style.top = `-${z}px`;
    });
    mainImg.style.top = `-${z}px`;
  }
  mX = e.clientX;
  mY = e.clientY;
}

//end of animated circle//

document.body.addEventListener("mousemove", (e) => {
  var x = e.clientX;
  var y = e.clientY;
  mousecirclefn(x, y);
  animcircle(e, x, y);
});

document.body.addEventListener('mouseleave', () => {
  mousecircle.style.opacity = "0";
  mousedot.style.opacity = "0";
});

//main btn//
const mainbtns = document.querySelectorAll(".main-btn");

mainbtns.forEach(btn => {
  let ripple;

  btn.addEventListener('mouseenter', e => {
    // console.log(e.target.getBoundingClientRect()); this methos givs values of left and top value of curser//
    const left = e.clientX - e.target.getBoundingClientRect().left;
    const top = e.clientY - e.target.getBoundingClientRect().top;
    console.log(left);
    ripple = document.createElement("div");
    ripple.classList.add("ripple");
    ripple.style.left = `${left}px`;
    ripple.style.top = `${top}px`;
    btn.prepend(ripple);
  });

  btn.addEventListener('mouseleave', () => {
    btn.removeChild(ripple);
  });
});

//end of main btn//

//progress bar//
const sections = document.querySelectorAll("section");
const progressbar = document.querySelector(".progress-bar");
const halfcircle = document.querySelectorAll(".half-circle");
const halfcircleTop = document.querySelector(".half-circle-top");
const progressbarcircle = document.querySelector(".progress-bar-circle");
let scrollBool = false;

let scrollportion = 0;
// let scrollBool = false;
let imgWrapper =false;

const progressbarfn = (bigimgWrapper) => {
  imgWrapper = bigimgWrapper;
  let pageheight = 0;

  const pageviewportheight = window.innerHeight;
  if (!imgWrapper) {
    pageheight = document.documentElement.scrollHeight;
    scrollportion = window.pageYOffset;
  } else {
    pageheight = imgWrapper.firstElementChild.scrollHeight;
    scrollportion = imgWrapper.scrollTop;
  }

  const scrollportiondegree = (scrollportion / (pageheight - pageviewportheight) * 360);
  halfcircle.forEach(el => {
    el.style.transform = `rotate(${scrollportiondegree}deg)`;

    if (scrollportiondegree >= 180) {
      halfcircle[0].style.transform = "rotate(180deg)";
      halfcircleTop.style.opacity = "0";
    } else {
      halfcircleTop.style.opacity = "1";
    }
  });

  scrollBool = scrollportion + pageviewportheight === pageheight - 1;// it means we reach bottom of page
  console.log(scrollportion + pageviewportheight, pageheight);

  //arrow rotation

  if (scrollBool) {
    progressbarcircle.style.transform = "rotate(180deg)";
  } else {
    progressbarcircle.style.transform = "rotate(0)";
  }
  //end of arrow roataion

};
// progress bar onclick//
progressbar.addEventListener("click",e => {
  e.preventDefault();

  if(!imgWrapper)
  {
    const sectionPositions = Array.from(sections).map((section) => scrollportion + section.getBoundingClientRect().top);

  const position = sectionPositions.find((sectionposition) => {
    return sectionposition > scrollportion;
  });

  scrollBool ? window.scrollTo(0, 0) : window.scrollTo(0, position);
  // console.log(position);

  }else{
    scrollBool ? imgWrapper.scrollTo(0, 0) : imgWrapper.scrollTo(0,imgWrapper.scrollHeight);
  }
});

//End of progress bar click//

progressbarfn();
//end of progress bar//

//Navigation//
const menuicon = document.querySelector(".menu-icon");
const navbar = document.querySelector(".navbar");

const scrollfFn = () =>
{
  menuicon.classList.add("show-menu-icon");
  navbar.classList.add("hide-navbar");
   if (window.scrollY === 0) {
    menuicon.classList.remove("show-menu-icon");
    navbar.classList.remove("hide-navbar");
  }
  progressbarfn();
};

document.addEventListener('scroll', scrollfFn);


menuicon.addEventListener("click", () => {
  menuicon.classList.remove("show-menu-icon");
  navbar.classList.remove("hide-navbar");
})


// End of Navigation//

//about me text//
const aboutmetext = document.querySelector(".about-me-text");
const aboutmetextcontaint = 'I am HBO Docent, I have 6 year of experience as HBO Docent. I have good experience in HTML, CSS, JAVASCRIPT, SQL, and PHP and constantly learning and keeping myself up to date with current technology.'
Array.from(aboutmetextcontaint).forEach(char => {
  const span = document.createElement("span");
  span.textContent = char;
  aboutmetext.appendChild(span);
  span.addEventListener("mouseenter", (e) => {
    e.target.style.animation = "aboutmetextanim 10s infinite";
  });
});
//end of about me text//

// section-3//
const container = document.querySelector(".container");//this second const container display big img //
const projects = document.querySelectorAll('.project');
const projecthidebtn = document.querySelector(".project-hide-btn");
projects.forEach((project, i) => { //hideing projects from7,89 and 10 by giving indiax //
  project.addEventListener("mouseenter", () => {
    console.log(project.firstElementChild.offsetHeight, project.offsetHeight);
    project.firstElementChild.style.top = `-${project.firstElementChild.offsetHeight - project.offsetHeight + 20}px`;
  });

  project.addEventListener("mouseleave", () => {
    project.firstElementChild.style.top = "2rem";
  });
  //big img project- after clicking on img ,this img will display in big form.hence we created bigImgWrapper which hold dark background on which img will be dispaly//
  project.addEventListener("click", () => {
    const bigImgWrapper = document.createElement("div");// <div classname="Project-img-wrapper"></div>
    bigImgWrapper.className = "project-img-wrapper";
    container.appendChild(bigImgWrapper);// now bigImgWreapper is attached to container //

    const bigimg = document.createElement('img');
    bigimg.className = "project-img";

    const imgpath = project.firstElementChild.getAttribute("src").split(".")[0];

    bigimg.setAttribute("src", `${imgpath}-big.jpg`);
    bigImgWrapper.appendChild(bigimg);
    document.body.style.overflowY = "hidden";// hide the scrolldown of body//

    document.removeEventListener("scroll",scrollfFn);

    progressbarfn(bigImgWrapper);
    bigImgWrapper .onscroll = () =>{
      progressbarfn(bigImgWrapper);
    }


    projecthidebtn.classList.add("change");
    projecthidebtn.onclick = () => {
      projecthidebtn.classList.remove("change");
      bigImgWrapper.remove();
      document.body.style.overflowY = "scroll";

      document.addEventListener("scroll",scrollfFn);

      
      progressbarfn();
    };
  });
  i >= 6 && (project.style.cssText = "display:none; opacity:0"); // we can write in if  statment like --> if(i >= 6) { project.style.cssText = "display:none; opacity:0"; }
});

//project button//
const section3 = document.querySelector(".section-3");
const projectbtn = document.querySelector(".project-btn");
const projectbtnText = document.querySelector(".project-btn span");
var showhideproject = true;

const showprojects = (project, i) => {

  setTimeout(() => {

    project.style.display = "flex"; section3.scrollIntoView({ block: "end" });
  }, 600);// section3 created because once click on showmore button aftersome time interval display project manually scroll down hence scrollintoView will show project//

  setTimeout(() => { project.style.opacity = "1" }, i * 200);
}

const hideproject = (project, i) => {
  setTimeout(() => {
    project.style.display = "none"; section3.scrollIntoView({ block: "end" });
  }, 600);

  setTimeout(() => {
    project.style.opacity = "0"
  }, i * 100);

}

projectbtn.addEventListener("click", (e) => {
  e.preventDefault(); //without e .prventdefault() method onclick on button navigate to start of page//

  projectbtn.firstElementChild.nextElementSibling.classList.toggle("change");

  projects.forEach((project, i) => {
    if (i >= 6) {
      if (showhideproject) {
        showprojects(project, i);
        projectbtnText.textContent = "show less";
      }
      else {
        hideproject(project, i);
        projectbtnText.textContent = "show More";
      }
    }
  });
  showhideproject = !showhideproject;
});
//End of project button//
//End of section-3//

//secion 4//
document.querySelectorAll(".service-btn").forEach((service) => {
  service.addEventListener("click", (e) => {
    e.preventDefault();

    const servicetext = service.nextElementSibling;
    servicetext.classList.toggle("change");

    const rightposition = servicetext.classList.contains("change") ? `calc(100% - ${getComputedStyle(service.firstElementChild).width})` : 0;
    // after click on serive-btn it should move on left postion from right postion hence we check changeclass if postion is true then move to left other wise  zero that we have written as : 0 conndtion//

    service.firstElementChild.style.right = rightposition;

  });
});

// section-5//

//Form //f
const formHeading = document.querySelector(".form-heading")
const formInputs = document.querySelectorAll(".contact-form-input");

formInputs.forEach(input => {
  input.addEventListener('focus', () => {
    formHeading.style.opacity = "0";
    setTimeout(() => {
      formHeading.textContent = `Your ${input.placeholder}`;
      formHeading.style.opacity = "1";
    }, 300);

  });

  input.addEventListener('blur', () => {
    formHeading.style.opacity = "0";
    setTimeout(() => {
      formHeading.textContent = `Let's Talk`;
      formHeading.style.opacity = "1";
    }, 300);

  });
});
// End of Form//

//slide show//
const slideshow = document.querySelector(".slideshow");


setInterval(() => {

  const firsticon = slideshow.firstElementChild;

  firsticon.classList.add("faded-out");

  const thirdicon = slideshow.children[3];
  thirdicon.classList.add("light");

  thirdicon.previousElementSibling.classList.remove("light");

  setTimeout(() => {

    slideshow.removeChild(firsticon); // remove icon from frontside//
    slideshow.appendChild(firsticon); // added icon from lastside//

    setTimeout(() => {
      firsticon.classList.remove("faded-out");
    }, 500);

  }, 500);
}, 2000);
// end of slide show//



//form validation
const form = document.querySelector(".contact-form");
const username = document.getElementById("name");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const message = document.getElementById("message");
const messages = document.querySelectorAll(".message");

const error = (input,message) =>{
  input.nextElementSibling.classList.add("error");
  input.nextElementSibling.textContent = message;
};

const success =(input) =>{
  input.nextElementSibling.classList.remove("error");
}
const checkrequiredfield = (input) => {
  // console.log(inputArr);
  // inputArr.forEach((input) => {
   if (input.value.trim() === "") { // trim() is used bcoz if user can enter white spaces then it wont be blank ..
      //hence trim()string method that is used to remove whitespace characters from the start and end of a string.
      error(input, `${input.id} is required`);
      return false;
    } else {
      return true;
    }
  
};

const checklength = (input,min) =>{
if(input.value.trim().length < min){
  error( input,`${input.id} is must be at least ${min} charecters`)
}else{
  success(input);
}
};

const checkEmail =(input) =>{
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
if(regEx.test(input.value.trim())){
  success(input);
}else{
  error(input,"E-mail is not valid");
}

};


form.addEventListener("submit",e => {
  e.preventDefault();
    if (checkrequiredfield(username) === true) {
      checklength(username, 2);
    };
    // checklength(username,2);
    if (checkrequiredfield(subject) === true) {
      checklength(subject, 2);
    };
    // checklength(subject,2);
    if (checkrequiredfield(message) === true) {
      checklength(message, 2);
    };
    // checklength(message,10);
    
    if (checkrequiredfield(email) === true) {
      checklength(email, 2);
      checkEmail(email);

      //const notvalid =Array.from(messages).find((message)=>{
        //return message.classList.contains("error");
     // });
     // notvalid &&  e.preventDefault();
    };
});
//end of form validation
//End of section-5//
