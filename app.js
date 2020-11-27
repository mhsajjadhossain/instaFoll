let triggerBtn = document.querySelectorAll('[data-trigger="true"]')
let followBtn = document.querySelectorAll('[data-follow="true"]')
let firstStep = document.querySelector('.banner_wrap')
let secondStep = document.querySelector('.follow_button_area')
let thirdStep = document.querySelector('.get_email_wrap')
let mainForm = document.querySelector('.main_form')
let userNameInput = document.querySelector('[data-type="username"]')
let emailInput = document.querySelector('[data-type="emailAdd"]')
let counterFlag=1;
let popupWindow = (url)=>{
	return window.open(url,'popUpWindow','height=500,width=500,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes')
}
let triggerMe = ()=>{
	triggerBtn.forEach((btn)=>{
		btn.addEventListener('click',(e)=>{
			counterFlag++
			
			if(2 === counterFlag){
				firstStep.classList.add('d-none');
				secondStep.classList.remove('d-none');
				
	
				counterFlag = 0
	
				followBtn.forEach((follow)=>{
					follow.addEventListener('click',(e)=>{
						counterFlag++
						$(follow).siblings().addClass('disabled')
						let url = follow.getAttribute('data-url-info')
						popupWindow(url)
						follow.classList.add('disabled')
						
						if(counterFlag >= 4){
							secondStep.classList.add('d-none');
							thirdStep.classList.remove('d-none');
							counterFlag = 0;
	
							mainForm.addEventListener('submit',(e)=>{
								e.preventDefault();
								let username = userNameInput.value;
								let emailAddress = emailInput.value;
								$.get( `https://hooks.zapier.com/hooks/catch/1805654/oe3g3a1/?email=${emailAddress}&name=${username}`);
								
								$('.get_email_wrap').addClass('d-none')
								$('.thank_you_msg').removeClass('d-none')
								   
							})
							
	
						}
					})
				})
	
	
			}
			
		})
	
	})
}




let alertBtn = document.querySelectorAll('[data-condition]')

alertBtn.forEach(btn=>{
	btn.addEventListener('click',()=>{
		let expr = btn.getAttribute('data-condition')
		if(expr === 'yes'){
			$('.popupModal').addClass('hide')
			$('.modal_overlay').addClass('hide')
			triggerMe()
		}else if(expr === 'no'){
			$('.popupModal').addClass('hide')
			$('.ifFalse').addClass('show')
			
		}else if(expr === 'notnow'){
			$('.popupModal').addClass('hide')
			$('.ifFalse').removeClass('show')
			$('.modal_overlay').addClass('hide')
			triggerMe()
		}

		

		
	})
})









// $('.btn').on('click',function(){
// 	var val = $('.first').clone()

// 	$('.output').append(val)
	
//  console.log('val :', val);
// })