# Belly Button Biodiversity

![Bacteria by filterforge.com](Images/bacteria_by_filterforgedotcom.jpg)

Building an interactive dashboard to explore the [Belly Button Biodiversity DataSet](http://robdunnlab.com/projects/belly-button-biodiversity/).

## Flask API

Used Flask API to serve the data needed for the plots.

## Plotly.js

Used Plotly.js to build interactive charts for the dashboard.

* PIE chart that uses data from the samples route (`/samples/<sample>`) to display the top 10 samples.

  ![PIE Chart](bellybutton-bd/static/Images/pie_chart.png)

* Bubble Chart that uses data from the samples route (`/samples/<sample>`) to display each sample.

  ![Bubble Chart](bellybutton-bd/static/Images/bubble_chart.png)

* Displayed the sample metadata from the route `/metadata/<sample>`

    ![Bubble Chart](bellybutton-bd/static/Images/bubble_chart.png)
  

* Updated all of the plots any time that a new sample is selected.

![Example Dashboard Page](bellybutton-bd/static/Images/dashboard.png)

## Heroku

Link to deployed project: https://bellybutton-bd.herokuapp.com/