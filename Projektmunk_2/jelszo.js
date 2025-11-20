const requestForm = document.getElementById('request-form');
    const emailInput = document.getElementById('email');
    const requestMsg = document.getElementById('request-msg');
    const stepRequest = document.getElementById('step-request');
    const stepReset = document.getElementById('step-reset');
    const resetForm = document.getElementById('reset-form');
    const codeInput = document.getElementById('code');
    const pw = document.getElementById('pw');
    const pw2 = document.getElementById('pw2');
    const togglePw = document.getElementById('toggle-pw');
    const strengthBar = document.getElementById('strength-bar');
    const resetMsg = document.getElementById('reset-msg');
    const useLinkBtn = document.getElementById('use-link');
    const backRequest = document.getElementById('back-request');

    function showStepReset(){
      stepRequest.classList.add('hidden');
      stepReset.classList.remove('hidden');
      stepReset.setAttribute('aria-hidden','false');
    }
    function showStepRequest(){
      stepReset.classList.add('hidden');
      stepRequest.classList.remove('hidden');
      stepReset.setAttribute('aria-hidden','true');
    }

    requestForm.addEventListener('submit', async (e)=>{
      e.preventDefault();
      const email = emailInput.value.trim();
      if(!email){ requestMsg.textContent='Adj meg egy e-mail címet.'; return }
      requestMsg.textContent='Kérés küldése…';

      try{
        const res = await fakeNetwork('/api/request-reset', {email});
        if(res.ok){
          requestMsg.textContent='Küldtük a kódot az e-mailre.';
          showStepReset();
        } else {
          requestMsg.textContent = res.error || 'Hiba történt. Próbáld újra.';
        }
      }catch(err){
        requestMsg.textContent = 'Hálózati hiba: '+err.message;
      }
    });

    togglePw.addEventListener('click', ()=>{
      const t = pw.type === 'password' ? 'text' : 'password';
      pw.type = t; pw2.type = t;
      togglePw.textContent = t === 'text' ? 'Elrejt' : 'Mutat';
    });

    pw.addEventListener('input', ()=>{
      const score = passwordScore(pw.value);
      strengthBar.style.width = (Math.min(100, score*20)) + '%';
    });

    resetForm.addEventListener('submit', async (e)=>{
      e.preventDefault();
      resetMsg.textContent='';
      const code = codeInput.value.trim();
      if(!/^[0-9]{4,8}$/.test(code)) { resetMsg.textContent='A kód 4-8 számjegy lehet.'; return }
      if(pw.value.length < 8){ resetMsg.textContent='A jelszónak legalább 8 karakter hosszúnak kell lennie.'; return }
      if(pw.value !== pw2.value){ resetMsg.textContent='A jelszavak nem egyeznek.'; return }

      resetMsg.textContent='Várj…';
      try{
        const res = await fakeNetwork('/api/confirm-reset', {email: emailInput.value.trim(), code, newPassword: pw.value});
        if(res.ok){ resetMsg.textContent='Sikeres visszaállítás! Most bejelentkezhetsz az új jelszóval.'; resetMsg.classList.add('success'); }
        else resetMsg.textContent = res.error || 'A visszaállítás sikertelen.';
      }catch(err){ resetMsg.textContent = 'Hálózati hiba: '+err.message }
    });

    backRequest.addEventListener('click', ()=>{ showStepRequest(); requestMsg.textContent=''; });


    function passwordScore(p){

      let score = 0;
      if(p.length >= 8) score++;
      if(/[0-9]/.test(p)) score++;
      if(/[a-z]/.test(p)) score++;
      if(/[A-Z]/.test(p)) score++;
      if(/[^A-Za-z0-9]/.test(p)) score++;
      return score; 
    }

   
    async function fakeNetwork(path, body){
      await new Promise(r=>setTimeout(r,700));
      if(path === '/api/request-reset'){
        return {ok:true, message:'Sent', demo:true};
      }
      if(path === '/api/confirm-reset'){
        if(body.code === '123456') return {ok:true};
        return {ok:false, error:'Érvénytelen kód.'};
      }
      return {ok:false, error:'Ismeretlen útvonal'};
    }
    emailInput.focus();