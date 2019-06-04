function buildMetadata(sample) {

  console.log(sample);
  
  // Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  var url = `/metadata/${sample}`;
  d3.json(url).then(data => {
    // Use d3 to select the panel with id of `#sample-metadata`
    var sampleMD = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    sampleMD.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    var list = sampleMD.append("ul");

    Object.entries(data).forEach(([key, value]) => {
      list.append("li").text(`${key}: ${value}`);
    });

  });

  // BONUS: Build the Gauge Chart
  // buildGauge(data.WFREQ);
}


function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  // @TODO: Build a Bubble Chart using the sample data
  d3.json(`/samples/${sample}`).then(data1 => {
    
    var trace1 = {
      x: data1.otu_ids,
      y: data1.sample_values,
      mode: 'markers',
      marker: {
        size: data1.sample_values,
        color: data1.otu_ids
      },
      text: data1.otu_labels
    };
    
    var data = [trace1];
    
    var layout = {
      showlegend: false,
      xaxis: {
        title: {
          text: 'OTU ID',
        }
      }
    };

    Plotly.newPlot('bubble', data, layout);


    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).

    var piedata = [{
      values: data1.sample_values.slice(0, 10),
      hovertext: data1.otu_labels.slice(0, 10),
      labels: data1.otu_ids.slice(0, 10),
      hoverinfo: "hovertext",
      type: "pie"
    }];

    Plotly.newPlot("pie", piedata);

  });  
}


function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    console.log(firstSample);
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  console.log(newSample);
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
