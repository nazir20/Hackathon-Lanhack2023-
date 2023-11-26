// Assume 'data' is already loaded and contains the CSV data
// You can load the 'output.js' file in a script tag before this script

function findLabel(formData) {
  for (const row of data) {
    if (
      parseFloat(row.language_vocab) === parseFloat(formData.get("lang_voc")) &&
      parseFloat(row.memory) === parseFloat(formData.get("memory")) &&
      parseFloat(row.survey_score) === parseFloat(formData.get("survey_score")) &&
      parseFloat(row.speed) === parseFloat(formData.get("speed")) &&
      parseFloat(row.visual_discrimination) ===
        parseFloat(formData.get("visual_discrimination")) &&
      parseFloat(row.audio_discrimination) ===
        parseFloat(formData.get("audio_discrimination"))
    ) {
      return {
        label: row.label,
        label_name: row.label_name,
      };
    }
  }

  // Return null if no match found
  return null;
}


document.getElementById("findLabelButton").addEventListener("click", function () {
    const formData = new FormData(document.getElementById("myForm"));
    const result = findLabel(formData);

    if (result) {
      const label = result.label;
      const label_name = result.label_name;
      localStorage.setItem('label', label_name);
      window.location.href = "/result";

    } else {
      alert("En Error Happened. Try Again!");
    }
  });
