// Deliverable 3 

// Create the buildChart function.

function buildCharts(sample) {

  // Use d3.json to load the samples.json file 

  d3.json("samples.json").then((data) => {

    console.log(data);

    // Create a variable that holds the samples array. 

    var samplesArray = data.samples;

    console.log(samplesArray)

    // Create a variable that filters the samples for the object with the desired sample number.

    var filtered = samplesArray.filter(sampleObj => sampleObj.id == sample);

    console.log(filtered)

    // 1. Create a variable that filters the metadata array for the object with the desired sample number.

    var metadata = data.metadata;

    var metadata_filtered = metadata.filter(sampleObj => sampleObj.id == sample);

    // Create a variable that holds the first sample in the array.
  
    var sample_1 = filtered[0]

    console.log(sample_1)

    // 2. Create a variable that holds the first sample in the metadata array.
    
    var sample_1_metadata = metadata_filtered[0];

    // Create variables that hold the otu_ids, otu_labels, and sample_values.

    var otu_ids = sample_1.otu_ids

    var otu_labels = sample_1.otu_labels
    
    var sample_values = sample_1.sample_values

    console.log(otu_ids)

    console.log(otu_labels)

    console.log(sample_values)

    // 3. Create a variable that holds the washing frequency.

    var washing_frequency = parseFloat(result.washing_frequency)
    
    console.log(washing_frequency)
   
    // Create the yticks for the bar chart.
    
    var yticks = otu_ids.slice(0,10).map(ids => `OTU ${ids}`).reverse();

    console.log(yticks);

    // Use Plotly to plot the bar data and layout.
    
    Plotly.newPlot("bar", barData, barLayout);
    
    // Use Plotly to plot the bubble data and layout.
    
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
   
    // 4. Create the trace for the gauge chart.
    
    var gaugeData = [{

        value: washing_frequency,

        type: "indicator",

        mode: "gauge+number",

        title: {text: "<b> Belly Button Washing Frequeny </b> <br></br> Scrubs Per Week "},

        gauge: {
            
            axis: {range: [null,10], dtick: "2"},

            bar: {color: "black"},

            steps:[
                {range: [0, 2], color: "blueviolet"},

                {range: [2, 4], color: "aqua"},

                {range: [4, 6], color: "chartreuse"},

                {range: [6, 8], color: "cornflowerblue"}

                {range: [8, 10], color: "mediumpuprple"}
                
            ],

            dtick: 2 
        }

    }];
    
    // 5. Create the layout for the gauge chart.
    
    var gaugeLayout = { 

        automargin: true
     
    };

    // 6. Use Plotly to plot the gauge data and layout.
    
    Plotly.newPlot("gaugle", gaugeData, gaugeLayout);
  });
  
}
