class Modal {
  constructor({
    button,
    zIndex,
    duration = ".3",
    classModalShow = "modal--show",
    classBackdrop = "backdrop",
    classBackdropShow = "backdrop--show",
  }) {
    if(!button)  throw new Error(`Modal button not defined`);

    this.button = button;
    this.isShow = false;

    this.classModalShow = classModalShow;
    this.classBackdrop = classBackdrop;
    this.classBackdropShow = classBackdropShow;

    if(this.modal() === null) throw new Error(`Modal ${button.dataset.modalToggle} not defined`);
    
    this.modal().style.transition = `all ${duration}s ease-in-out`;
    this.modal().style.zIndex = zIndex;

    this.appendBackdrop();
    this.backdropClickHandler();
    this.buttonClickHandler();
  }

  // backdrop
  appendBackdrop() {
    const isBackdrop = document.getElementById(this.classBackdrop);
    if (isBackdrop) return;

    const backdrop = document.createElement("div");
    backdrop.classList.add(this.classBackdrop);
    backdrop.id = this.classBackdrop;
    document.body.appendChild(backdrop);
  }

  backdropClickHandler() {
    document
      .getElementById(this.classBackdrop)
      .addEventListener("click", () => {
        this.hide();
      });
  }

  backdrop() {
    if (this.isShow) {
      document
        .getElementById(this.classBackdrop)
        .classList.add(this.classBackdropShow);
      return;
    }

    if (
      !this.isShow &&
      document.getElementsByClassName(this.classModalShow).length === 0
    ) {
      document
        .getElementById(this.classBackdrop)
        .classList.remove(this.classBackdropShow);
      return;
    }
  }

  // button
  buttonClickHandler() {
    this.button.addEventListener("click", () => {
      if (this.isShow) {
        this.hide();
        return;
      }
      this.show();
    });
  }

  // modal
  modal() {
    const modal = document.querySelector(
      `[data-modal="${this.button.dataset.modalToggle}"]`
    );
    return modal;
  }

  // methods
  show() {
    this.isShow = true;
    this.modal().classList.add(this.classModalShow);
    this.backdrop();
  }

  hide() {
    this.isShow = false;
    this.modal().classList.remove(this.classModalShow);
    this.backdrop();
  }

  toggle() {
    if (this.isShow) {
      this.hide();
      return;
    }
    this.show();
  }
}

const modalButton1 = document.querySelector('[data-modal-toggle="modal-1"]');
const modalButton2 = document.querySelector('[data-modal-toggle="modal-2"]');
const modalButton3 = document.querySelector('[data-modal-toggle="modal-3"]');

const modal1Params = {
  button: modalButton1,
  zIndex: 150,
  duration: 0.3,
};

const modal2Params = {
  button: modalButton2,
  zIndex: 2300,
  duration: 0.4,
};

const modal3Params = {
  button: modalButton3,
  zIndex: 3300,
  duration: 0.5,
};

const modal1 = new Modal(modal1Params);
const modal2 = new Modal(modal2Params);
const modal3 = new Modal(modal3Params);

document.getElementById("hide-1").addEventListener("click", () => {
  modal1.hide();
});

document.getElementById("hide-2").addEventListener("click", () => {
  modal2.hide();
});
