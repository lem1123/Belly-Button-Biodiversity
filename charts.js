function init() {

  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");
  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
};
// Initialize the dashboard
init();
function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  };
// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");
    // Use `.html("") to clear any existing metadata
    PANEL.html("");
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
  });
};
// Deliverable 1 
// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
      let samples = data.samples;
    // 4. Create a variable that filters the samples for the object with the desired sample number.
      let sampleArray = samples.filter(sampleObj => sampleObj.id == sample);
    //  5. Create a variable that holds the first sample in the array.
      let sampleOne = sampleArray[0]
    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
      let otuID = sampleOne.otu_ids.toString().split(",");
      let otuLabels = sampleOne.otu_labels;
      let sampleValues = sampleOne.sample_values;
    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
      var yticks = otuID.map(function(element){
        return `OTU${element}`;
        }).slice(0,10).reverse();
    // 8. Create the trace for the bar chart. 
      var barData = [{
      x: sampleValues.slice(0,10).reverse(),
      y: yticks,
      text: otuLabels,
      type: "bar",
      orientation: "h"
      }];
    // 9. Create the layout for the bar chart. 
      var barLayout = {
      title: "Top 10 Bacterial Cultures Found",
      width: 450,
      height: 400 
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout);
    var bubbleOTUs = sampleOne.otu_ids
    // 1. Create the trace for the bubble chart.
    var bubbleData = [{
      x: bubbleOTUs ,
      y: sampleValues ,
      text: otuLabels,
      mode: "markers",
      marker: {
        color: bubbleOTUs,
        size: sampleValues,
        colorscheme: "Purples"
      }
    }];
    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: "Bacteria Cultures Per Sample", 
      xaxis: {title: "OTU ID"},
      height: 600,
      width: 1000
    };
    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout); 
    let metadata = data.metadata;
    let freqArray = metadata.filter(element => element.id == sample);
    let selectedFreq = freqArray[0];
    let wFreq = selectedFreq.wfreq;
    // 4. Create the trace for the gauge chart.
    var gaugeData = [{
        value: wFreq,
        title: {
          text: "Belly Button Washing Frequency<br>Scrubs Per Week",
          font: {size:18}},
        type: "indicator",
        mode: "gauge+number",
        gauge: {
          axis: {visible: true, range:[0, 10]},            
          bar: {color: "black"},
          steps:[
                {range: [0, 2], color: "blueviolet"},
                {range: [2, 4], color: "aqua"},
                {range: [4, 6], color: "yellow"},
                {range: [6, 8], color: "cornflowerblue"},
                {range: [8, 10], color: "mediumpurple"}
              ]
        }

    }];
    
    // 5. Create the layout for the gauge chart.
      var gaugeLayout = { 
          width: 400,
          height: 300
         };
    // 6. Use Plotly to plot the gauge data and layout.
        Plotly.newPlot("gauge", gaugeData, gaugeLayout);

        });

  };
    
