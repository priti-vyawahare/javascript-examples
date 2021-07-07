//mouse circle
const mousecircle = document.querySelector(".mouse-circle");
const mousedot = document.querySelector(".mouse-dot");
const mousecirclefn = (x, y) => {
    mousecircle.style.cssText = `top:${y}px;left:${x}px; opacity:1`;
    mousedot.style.cssText = `top:${y}px;left:${x}px; opacity:1`;
};
//end of mouse circle

// animation cicle
const circles= document.querySelectorAll(".circle");
const mainimg = document.querySelector(".main-circle img");
console.log(circles, mainimg);

var mX = 0;
var mY = 0; 
var z = 100;
const animatecircle = (e,x,y) =>//this function help us defigned mouse movement and images in circle move in apposite direction.
{
    if(x < mX)
    {
       circles.forEach((circle) => {
           circle.style.left = `${z}px`;
       });
       mainimg.style.left = `${z}px`;
    } else if(x > mX)
    {
        circles.forEach((circle) => {
            circle.style.left =`-${z}px`;
        });
        mainimg.style.left = `-${z}px`;
    }
    if(y < mY)
    {
       circles.forEach((circle) => {
            circle.style.top =`${z}px`;
        });
        mainimg.style.top = `${z}px`;
    }
    else if (y > mY)
    {
        circles.forEach((circle) => {
            circle.style.top =`-${z}px`;
        });
        mainimg.style.top = `-${z}px`;
    }
mX = e.clientX;
mY = e.clientY;
};


document.body.addEventListener('mousemove', (e) => {
    var x = e.clientX;
    var y = e.clientY;
    mousecirclefn (x,y);
    animatecircle (e,x,y);
});
document.body.addEventListener("mouseleave", ()=> {
    mousecircle.style.opacity = '0';
    mousedot.style.opacity ='0';
});
//main btn
const mainbtns = document.querySelectorAll(".main-btn");//two main button //
console.log(mainbtns);
mainbtns.forEach(btn => {
    let ripple;
    btn.addEventListener("mouseenter", (e) => {
        const left = e.clientX - e.target.getBoundingClientRect().left;//  clientX and clientY used to calculate left and top position of curser inside bottom //
        const top = e.clientY - e.target.getBoundingClientRect().top;
        console.log(e.clientX, e.target.getBoundingClientRect().left);
        ripple = document.createElement("div");//created html div tag//
        ripple.classList.add("ripple");// div tag with ripple class//
        ripple.style.left = `${left}px`;
        ripple.style.top = `${top}px`;
        btn.prepend(ripple);
    });
    btn.addEventListener("mouseleave", () => {
        btn.removeChild(ripple);
    });
});
// end of main-button//
//end of section-1//

//navigation//
const menuicon = document.querySelector(".menu-icon");
const navbar = document.querySelector(".navbar");
document.addEventListener('scroll',() => {
    menuicon.classList.add("show-menu-icon");
    navbar.classList.add("hide-navbar");
if(window.scrollY === 0)// scrollY gives value of scrollbar in pixels and we cheked if scrolly===0 means scrollbar is top,hence display navbar and hide menuicon//
{
menuicon.classList.remove("show-menu-icon");
navbar.classList.remove("hide-navbar");
}
});
//end of navigation.//





//about me text//
const aboutMetext = document.querySelector(".about-me-text");
const aboutMetextcontaint = " I Worked as ICT Docent in INDIA, I have 6 year of experince and won award as Best Teaching and now brushup my mind by learning Javascript,HTML,CSS,SQL and PHP:)";
Array.from(aboutMetextcontaint).forEach((char) => { //this array.from() method covert string value  including spaces into array //
    const span = document.createElement('span');//now we need to store each charector in span element ,we have to look through the array and asigned to them to each charector//
    span.textContent = char;
    aboutMetext.appendChild(span);
    span.addEventListener('mouseenter',(e) => 
    {
     e.target.style.animation = "aboutMetextanimation 5s infinite";
    });
});
const container = document.querySelector('.container');
const projects = document.querySelectorAll('.project');
const projectHideBtn = document.querySelector(".project-hide-btn")
projects.forEach((project) =>{
    project.addEventListener('mouseenter',() => {
        project.firstElementChild.style.top =`-${project.firstElementChild.offsetHeight-project.offsetHeight + 10}px`//+ 10 givs small space when inages in project scrollup//
    });

    project.addEventListener("mouseleave",() => {
  project.firstElementChild.style.top="2rem";

});

//after on image making imge big so name bigproject image//
project.addEventListener("click",() => {
    const bigImgwrapper = document.createElement("div");
    bigImgwrapper.className ="project-img-wrapper";
    container.appendChild(bigImgwrapper);
const bigimg = document.createElement("img");
bigimg.className ="project-img";
// bigimg.setAttribute("src","calculator.png");
//dipsplay img in big size//
const imgpath = project.firstElementChild.getAttribute("src").split(".")[0];
console.log(imgpath);
bigimg.setAttribute("src",`${imgpath}.png`);
bigImgwrapper.appendChild(bigimg);
document.body.style.overflowY = "hidden";//in order to avoid two scroll bar ,when we make project image big//
projectHideBtn.classList.add("change");
projectHideBtn.onclick = () => {
    projectHideBtn.classList.remove("change");
    bigImgwrapper.remove();
    document.body.style.overflowY = "scroll";
};
});

});
//section-4//
document.querySelectorAll(".service-btn").forEach(service =>{//for each os subject in service0btn..look at html//
    service.addEventListener('click',e =>{
     e.preventDefault();//preventDefault methos stop scrolling up which was by default after addeventlistener//
      const servicetext = service.nextElementSibling;//here servicetext  paragraph inside service-btn ,hence we write next elementSibling//
      servicetext.classList.toggle("change");//paragrapgh will display after on and off button hence toggle metthod is used to switch between display and hide para//
    const rightposition = servicetext.classList.contains("change")?`calc(100% - ${getComputedStyle(service.firstElementChild).width})`:0;// changing postion of service-btn from right to left after mouse click//
    service.firstElementChild.style.right = rightposition;
    });
});
//End of section -4//

//start of section-5//
//form//
const formheading =document.querySelector(".form-heading");
const formInput = document.querySelectorAll(".contact-form-input");
formInput.forEach(input =>{
    input.addEventListener("focus",() =>{
        formheading.style.opacity="0";
        setTimeout(()=>{
            formheading.textContent =`Your ${input. placeholder}`;
            formheading.style.opacity="1";
        },300);
        
    });

    input.addEventListener("blur",() =>{
        formheading.style.opacity="0";
        setTimeout(()=>{
            formheading.textContent ="let's talk";
            formheading.style.opacity="1";
        },300);
        
    });
});
//end of form//
// slide-show//
const slideshow = document.querySelector(".slideshow");
// setinterval is function takes two argument ,calback function executed after each time interval and second argument is time//
setInterval(() => {
    const firsticon = slideshow.firstElementChild;
    firsticon.classList.add("faded-out");
   const thirdicon = slideshow.children[3];
   thirdicon.classList.add("light");
   thirdicon.previousElementSibling.classList.remove("light");

    setTimeout(() => {
    slideshow.removeChild(firsticon);// remove icon from slide show//
    slideshow.appendChild(firsticon);//add icon in slideshow//
    setTimeout(() => {
    firsticon.classList.remove("faded-out");
    }, 500);
    },500);
    }, 3000);
//end of slide show//
//End of section-5//




