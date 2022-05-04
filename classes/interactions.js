

//------------------------------------------------------------------------------------------------------------------
class ButtonData {
   constructor(id, label, emoji, style = `PRIMARY`) {
      this.id = id;
      this.label = label;
      this.emoji = emoji;
      this.style = style;
   }
}

module.exports.ButtonData = ButtonData;

//------------------------------------------------------------------------------------------------------------------
class SelectOptionData {
   constructor(value, label, emoji, description) {
      this.value = value;
      this.label = label;
      this.emoji = emoji;
      this.description = description;
   }
}

module.exports.SelectOptionData = SelectOptionData;