import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Chart, registerables} from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit  {
  ngAfterViewInit ()
  {
  
   var myChart = new Chart("myChart", {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: 'Data1',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor:"#0196FD",
            borderColor: "#0196FD",
            borderWidth: 1
        },
        {
          label: 'Dat21',
          data: [19, 12, 5, 3, 1, 6],
          backgroundColor:"#FFAF00",
          borderColor: "#FFAF00",
          borderWidth: 1
      }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        responsive:true
    }
});

var dougnetchart = new Chart("doughnut", {
  type: "doughnut",
  data : {
    labels: [
      'Red',
      'Blue',
      'Yellow'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  }
  })

  var linechart = new Chart("line", {
    type: "line",
     data : {
      labels: ['1','2','3','4','5','6'],
      datasets: [{
       
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    }
    })
}  
}
