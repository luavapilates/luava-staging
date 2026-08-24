/* LUAVA Pilates — shared app logic V14 */

(function(){
  const cfg = window.LUAVA_CONFIG || {};
  const opening = cfg.openingDate ? new Date(cfg.openingDate).getTime() : null;

  function tickCountdown(){
    document.querySelectorAll('[data-opening-countdown]').forEach(el=>{
      if(!opening){ el.textContent=''; return; }
      const diff = Math.max(0, opening-Date.now());
      if(diff<=0){ el.textContent='LUAVA ist geöffnet'; return; }
      const d=Math.floor(diff/86400000);
      const h=Math.floor((diff%86400000)/3600000);
      const m=Math.floor((diff%3600000)/60000);
      el.textContent=`${d} Tage · ${String(h).padStart(2,'0')} Std. · ${String(m).padStart(2,'0')} Min.`;
    });
  }
  tickCountdown();
  setInterval(tickCountdown,30000);

  // Auto year
  document.querySelectorAll('[data-current-year]').forEach(el=>el.textContent=new Date().getFullYear());

  // Demo contact forms
  document.querySelectorAll('[data-demo-form]').forEach(form=>{
    form.addEventListener('submit',e=>{
      e.preventDefault();
      const success=form.querySelector('[data-form-success]');
      if(success) success.style.display='block';
    });
  });

  // Booking fallback: if a real bsport URL is configured, links marked data-bsport-booking go there.
  if(cfg.bsport && cfg.bsport.live && cfg.bsport.bookingUrl){
    document.querySelectorAll('[data-bsport-booking]').forEach(a=>{
      a.setAttribute('href',cfg.bsport.bookingUrl);
      a.setAttribute('target','_self');
    });
  }
})();

(function(){
  const cfg = window.LUAVA_CONFIG || {};
  if(!cfg.openingDate) return;
  const target = new Date(cfg.openingDate).getTime();
  const prelaunch = Date.now() < target;

  document.querySelectorAll('[data-prelaunch-only]').forEach(el=>{
    if(!prelaunch) el.hidden = true;
  });
  document.querySelectorAll('[data-postlaunch-only]').forEach(el=>{
    if(prelaunch) el.hidden = true;
  });

  document.querySelectorAll('[data-launch-status]').forEach(el=>{
    if(prelaunch){
      el.innerHTML='<i></i> Pre-Opening · 04.10.2026';
    }else{
      el.classList.add('live');
      el.innerHTML='<i></i> LUAVA ist geöffnet';
    }
  });
})();

(function(){
  const cfg=window.LUAVA_CONFIG||{};
  if(cfg.bsport && cfg.bsport.live && cfg.bsport.memberAccountUrl){
    document.querySelectorAll('a[href="konto.html"]').forEach(a=>{
      a.href=cfg.bsport.memberAccountUrl;
    });
  }
})();
