// JavaScript להצגת והסתרת התפריט
const menuIcon = document.getElementById('menu-icon');
const menu = document.getElementById('menu');
const logoutOption = document.getElementById('logout-option');

menuIcon.addEventListener('click', function () {
  menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
});

document.addEventListener('click', function (event) {
  if (!menu.contains(event.target) && event.target !== menuIcon) {
    menu.style.display = 'none';
  }
});

// // JavaScript לפעולת LOGOUT
// logoutOption.addEventListener('click', function () {
//   // הוסיפי כאן את הפעולות שמתבצעות בעת ההתנתקות, לדוגמה, אפילו אפשר לשלוח בקשת POST לשרת
//   alert('You have logged out.');
// });


// // מאזינים ללחיצה על האייקון שמיועד לפתיחת הגלריה
// document.getElementById('open-gallery').addEventListener('click', function () {
//     // הפעלת ה-input
//     const input = document.getElementById('image-input');
//     input.style.display = 'block';
  
//     // מאזינים לשינוי ב-input (שבו יהיה הקובץ שהמשתמש בחר)
//     input.addEventListener('change', function () {
//       const selectedImage = input.files[0]; // הקובץ שנבחר
//       // בצעי פעולות נדרשות, לדוגמה שמירה במסד נתונים ועדכון התצוגה בדף
//       console.log('Selected image:', selectedImage);



//       const displayImage = document.getElementById('selected-image');
//       displayImage.src = URL.createObjectURL(selectedImage);


//     });
//   });
  




  