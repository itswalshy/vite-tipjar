---
layout: doc
title: TipJar
---

<div class="container mx-auto px-3 py-5 max-w-4xl" style="background-color: transparent;">
    <!-- Title Section -->
    <div class="text-center mb-6 animate__animated animate__fadeIn">
        <h1 class="app-title">
          TipJar
        </h1>
        <div class="app-subtitle">"If theres a Will, Theres a Way!" -Lauren 2025</div>
    </div>

    <!-- Main Application -->
    <div class="main-app">
        <!-- Initial Upload Section -->
        <div id="uploadSection" class="custom-card p-4 animate__animated animate__fadeInUp animate__delay-1s">
            <h2 class="text-lg font-bold text-gray-100 mb-4 text-center">Upload Tip Distribution Report</h2>
            <div class="file-drop-area mb-3">
                <div class="file-drop-icon">📁</div>
                <div class="file-message">Drag and drop file here</div>
                <input type="file" id="imageUpload" accept="image/*" class="file-input">
            </div>
            <div id="selectedFileName" class="mt-2 text-center text-gray-400"></div>
            <div class="mt-3 text-center">
                <button id="processButton" class="btn-primary py-2 opacity-50 cursor-not-allowed mx-auto" disabled>Process</button>
            </div>
        </div>

        <!-- Preview Section -->
        <div id="previewSection" class="mt-5 hidden animate__animated animate__fadeIn">
            <h2 class="text-lg font-bold text-gray-100 mb-3">Preview</h2>
            <div class="custom-card p-3">
                <div class="preview-container">
                    <img id="previewImage" class="rounded-lg" src="" alt="Preview">
                </div>
            </div>
        </div>

        <!-- Extracted Text Section -->
        <div id="extractedTextSection" class="mt-5 hidden animate__animated animate__fadeIn">
            <h2 class="text-lg font-bold text-gray-100 mb-3">Extracted Partner Hours</h2>
            <div class="custom-card p-3">
                <pre id="extractedText" class="whitespace-pre-wrap text-gray-300"></pre>
            </div>
        </div>

        <!-- Partner Data Section -->
        <div id="partnerDataSection" class="mt-5 hidden animate__animated animate__fadeIn">
            <h2 class="text-lg font-bold text-gray-100 mb-3">Partner Data</h2>
            <div class="custom-card p-3">
                <div id="totalHours" class="text-lg font-bold mb-3 text-gray-100"></div>
                <div id="partnerList" class="text-gray-300 partner-grid"></div>
            </div>

            <div class="mt-4">
                <label for="totalTipAmount" class="block mb-2 text-gray-300">Enter total tip amount for the week: $</label>
                <input type="number" id="totalTipAmount" min="0" step="10" class="w-full">
                <div class="text-center mt-3">
                    <button id="calculateTipsBtn" class="btn-primary mt-3 py-2">Calculate Tips</button>
                </div>
            </div>
        </div>

        <!-- Tip Distribution Results -->
        <div id="tipDistributionSection" class="mt-5 hidden animate__animated animate__fadeIn">
            <h2 class="text-lg font-bold text-gray-100 mb-3">Tip Distribution Results</h2>
            
            <div id="hourlyRateInfo" class="bg-card bg-opacity-100 text-gray-100 p-3 rounded-lg mb-3" style="background-color: var(--card-bg);">
                <p class="mb-0"><strong>Calculation:</strong></p>
                <p class="mb-0 text-spring-accent" id="calculationDetails"></p>
                <div id="billsNeeded" class="bills-summary mt-2">
                    <p class="mb-1"><strong>Bills Needed:</strong></p>
                    <p class="mb-0"><span id="twentyCount">0</span> × $20, <span id="tenCount">0</span> × $10, <span id="fiveCount">0</span> × $5, <span id="oneCount">0</span> × $1</p>
                </div>
            </div>
            
            <div id="tipDistributionList" class="partner-grid"></div>
            
            <button class="collapsible mt-3 text-gray-300">Copy-paste format</button>
            <div class="collapsible-content">
                <div class="p-3">
                    <pre id="copyPasteFormat" class="whitespace-pre-wrap bg-gray-800 bg-opacity-50 p-3 rounded text-sm text-gray-300"></pre>
                </div>
            </div>
            
            <div class="card-grid mt-4">
                <div class="text-center">
                    <button id="saveToHistoryBtn" class="btn-primary py-2">Save to History</button>
                </div>
                <div class="text-center">
                    <a id="downloadTableBtn" href="#" download="tip_distribution.html" class="btn-primary py-2 inline-block">Download as Table</a>
                </div>
            </div>
        </div>

        <!-- Distribution History -->
        <div id="historySection" class="mt-5 hidden animate__animated animate__fadeIn">
            <button class="collapsible text-gray-300">View Distribution History</button>
            <div class="collapsible-content">
                <div id="historyList" class="p-3"></div>
            </div>
        </div>

        <!-- Download Options -->
        <div id="downloadSection" class="mt-5 hidden animate__animated animate__fadeIn">
            <h2 class="text-lg font-bold text-gray-100 mb-3">Download Options</h2>
            <div class="space-y-3">
                <div class="text-center">
                    <a id="downloadOcrBtn" href="#" download="ocr_result.txt" class="btn-primary py-2 inline-block">Download OCR Text</a>
                </div>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <div class="section-divider"></div>
    <div class="text-center mt-4 mb-5">
        <p class="mb-0 footer-text">Made by William Walsh</p>
        <p class="mt-1 footer-text">Starbucks Store# 69600</p>
    </div>
</div>

<script>
// Add the following JavaScript to handle the drag and drop functionality
const fileDropArea = document.querySelector('.file-drop-area');
const fileInput = document.getElementById('imageUpload');

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    fileDropArea.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

['dragenter', 'dragover'].forEach(eventName => {
    fileDropArea.addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach(eventName => {
    fileDropArea.addEventListener(eventName, unhighlight, false);
});

function highlight() {
    fileDropArea.classList.add('dragover');
}

function unhighlight() {
    fileDropArea.classList.remove('dragover');
}

fileDropArea.addEventListener('drop', handleDrop, false);

function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    fileInput.files = files;
    
    // Trigger the change event
    const event = new Event('change', { bubbles: true });
    fileInput.dispatchEvent(event);
}

// Global state management (similar to Streamlit's session state)
const state = {
    ocrResult: null,
    imageData: null,
    partnerData: null,
    totalHours: 0,
    tipCalculated: false,
    weekCounter: 1,
    tipsHistory: [],
    hourlyRate: 0,
    totalTipAmount: 0,
    distributedTips: null
};

// Gemini API settings
const GEMINI_API_KEY = "AIzaSyCi_m_KbY-a36tvHl09C1Mtyx_K38GuokY";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Set up collapsible sections
    const collapsibles = document.getElementsByClassName('collapsible');
    for (let i = 0; i < collapsibles.length; i++) {
        collapsibles[i].addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    }
});

// File upload handling
imageUpload.addEventListener('change', function(e) {
    if (this.files.length > 0) {
        const file = this.files[0];
        selectedFileName.textContent = file.name;
        processButton.classList.remove('opacity-50', 'cursor-not-allowed');
        processButton.disabled = false;
        
        // Create image preview
        const reader = new FileReader();
        reader.onload = function(e) {
            state.imageData = e.target.result;
        }
        reader.readAsDataURL(file);
    }
});

// Helper function to convert base64 to correct format for Gemini API
function convertBase64ForGemini(base64String) {
    // Remove data URL prefix if present
    const base64Data = base64String.includes(',') 
        ? base64String.split(',')[1] 
        : base64String;
    
    return base64Data;
}

// Process button with Gemini API - now combines both steps
processButton.addEventListener('click', async function() {
    if (!state.imageData) return;
    
    // Show loading state
    this.textContent = 'Processing Tip Sheet...';
    this.disabled = true;
    
    try {
        // Step 1: Process the image
        const base64Image = convertBase64ForGemini(state.imageData);
        
        const promptText = "Please analyze this image and: " +
            "1. Extract all visible text, especially focusing on names and hours worked " +
            "2. Maintain the original formatting and structure " +
            "3. Preserve any important visual context " +
            "4. Make sure to clearly identify all partner/employee names and their corresponding hours " +
            "Extract and format the text clearly:";
        
        const payload = {
            contents: [
                {
                    parts: [
                        { text: promptText },
                        {
                            inline_data: {
                                mime_type: "image/jpeg",
                                data: base64Image
                            }
                        }
                    ]
                }
            ],
            generationConfig: {
                temperature: 0.4,
                topK: 32,
                topP: 1,
                maxOutputTokens: 2048,
            }
        };
        
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        
        if (!response.ok) {
            throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
        }
        
        const responseData = await response.json();
        
        if (responseData.candidates && 
            responseData.candidates[0] && 
            responseData.candidates[0].content && 
            responseData.candidates[0].content.parts && 
            responseData.candidates[0].content.parts[0] && 
            responseData.candidates[0].content.parts[0].text) {
            
            state.ocrResult = responseData.candidates[0].content.parts[0].text;
            
            // Show preview
            previewSection.classList.remove('hidden');
            previewImage.src = state.imageData;
            
            // Store extracted text but don't display the section
            extractedText.textContent = state.ocrResult;
            
            // Show download option for OCR text
            downloadSection.classList.remove('hidden');
            updateDownloadLinks();
            
            // Step 2: Automatically extract partner data
            this.textContent = 'Extracting Partner Data...';
            const success = await extractPartnerData();
            
            if (success) {
                // Hide extractedTextSection if it's visible (in case it was shown before)
                extractedTextSection.classList.add('hidden');
            }
            
        } else {
            throw new Error('Couldn\'t extract text from the API response');
        }
    } catch (error) {
        console.error('Error processing with Gemini API:', error);
        alert(`Error processing image: ${error.message || 'Unknown error'}`);
    } finally {
        // Reset process button
        processButton.textContent = 'Process';
        processButton.disabled = false;
    }
});

// Extract partner data function (now called automatically by the process button)
async function extractPartnerData() {
    if (!state.ocrResult) return false;
    
    try {
        // Prepare the prompt for partner data extraction
        const extractionPrompt = 
            `From the following text, extract partner names and their hours worked. Format as JSON:\n\n` +
            `${state.ocrResult}\n\n` +
            `Return a JSON array of objects with 'name' and 'hours' fields. Example:
            [
                {"name": "John Smith", "hours": 32.5},
                {"name": "Jane Doe", "hours": 28.75}
            ]
            
            Only include valid partners with hours. Output ONLY the JSON array, nothing else.`;
        
        // Prepare the request payload
        const payload = {
            contents: [
                {
                    parts: [
                        { text: extractionPrompt }
                    ]
                }
            ],
            generationConfig: {
                temperature: 0.2,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 2048,
            }
        };
        
        // Make the API call to extract partner data
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        
        if (!response.ok) {
            throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
        }
        
        const responseData = await response.json();
        const partnerDataText = responseData.candidates[0].content.parts[0].text;
        
        // Extract JSON from the response
        const jsonMatch = partnerDataText.match(/\[\s*{[\s\S]*}\s*\]/);
        let partnerData = [];
        
        if (jsonMatch) {
            try {
                partnerData = JSON.parse(jsonMatch[0]);
            } catch (e) {
                throw new Error('Failed to parse JSON from API response');
            }
        } else {
            throw new Error('No valid JSON found in the API response');
        }
        
        // Add partner numbers
        partnerData.forEach((partner, index) => {
            partner.number = index + 1;
        });
        
        // Calculate total hours
        state.totalHours = partnerData.reduce((sum, partner) => sum + parseFloat(partner.hours), 0);
        state.partnerData = partnerData;
        
        // Update UI
        totalHours.textContent = `Total Hours: ${state.totalHours}`;
        partnerList.innerHTML = '';
        
        partnerData.forEach(partner => {
            const partnerEl = document.createElement('div');
            partnerEl.classList.add('text-sm', 'mb-1');
            partnerEl.textContent = `${partner.name} - ${partner.hours} hours`;
            partnerList.appendChild(partnerEl);
        });
        
        // Show partner data section
        partnerDataSection.classList.remove('hidden');
        
        // Scroll to partner data section
        partnerDataSection.scrollIntoView({behavior: 'smooth'});
        
        return true;
    } catch (error) {
        console.error('Error extracting partner data:', error);
        alert(`Error extracting partner data: ${error.message || 'Unknown error'}`);
        return false;
    }
}

// Calculate Tips button
calculateTipsBtn.addEventListener('click', function() {
    const tipAmount = parseFloat(totalTipAmount.value);
    if (isNaN(tipAmount) || tipAmount <= 0) {
        alert('Please enter a valid tip amount.');
        return;
    }
    
    if (!state.partnerData || state.partnerData.length === 0) {
        alert('No partner data available.');
        return;
    }
    
    // Calculate hourly rate (truncate to 2 decimal places)
    state.totalTipAmount = tipAmount;
    state.hourlyRate = Math.floor((tipAmount / state.totalHours) * 100) / 100;
    
    // Calculate individual tips with bill distribution
    const partnerData = JSON.parse(JSON.stringify(state.partnerData)); // Deep copy
    const denominations = [20, 10, 5, 1];
    const startIndex = (state.weekCounter - 1) % partnerData.length;
    const remainingAmounts = {};
    
    // Calculate exact and rounded tip amounts
    partnerData.forEach(partner => {
        const exactAmount = partner.hours * state.hourlyRate;
        partner.raw_tip_amount = exactAmount;
        partner.exact_tip_amount = exactAmount;
        partner.tip_amount = Math.round(exactAmount);
        partner.bills = {20: 0, 10: 0, 5: 0, 1: 0};
        remainingAmounts[partner.number] = partner.tip_amount;
    });
    
    // Distribute bills
    for (const denomination of denominations) {
        // Create order of partners starting with rotation partner
        const partnerOrder = [];
        for (let i = 0; i < partnerData.length; i++) {
            partnerOrder.push((startIndex + i) % partnerData.length);
        }
        
        // Distribute bills of this denomination
        let distributed = true;
        while (distributed) {
            distributed = false;
            for (const idx of partnerOrder) {
                const partner = partnerData[idx];
                if (remainingAmounts[partner.number] >= denomination) {
                    partner.bills[denomination]++;
                    remainingAmounts[partner.number] -= denomination;
                    distributed = true;
                }
            }
        }
    }
    
    // Generate bills text and formatted output
    partnerData.forEach(partner => {
        const billsText = [];
        for (const denom of [20, 10, 5, 1]) {
            if (partner.bills[denom] > 0) {
                billsText.push(`${partner.bills[denom]}x$${denom}`);
            }
        }
        
        partner.bills_text = billsText.join(',');
        partner.formatted_output = `Partner Name: ${partner.name} | #: ${partner.number} | ` +
            `Hours: ${partner.hours} | Exact: $${partner.exact_tip_amount.toFixed(2)} | ` +
            `Cash: $${partner.tip_amount} | Bills: ${partner.bills_text}`;
    });
    
    // Save distributed tips to state
    state.distributedTips = partnerData;
    state.tipCalculated = true;
    
    // Update UI
    calculationDetails.textContent = `Total Tips: $${tipAmount.toFixed(2)} ÷ Total Hours: ${state.totalHours.toFixed(2)} = $${state.hourlyRate.toFixed(2)} per hour`;
    
    // Calculate total bills needed
    const totalBills = {20: 0, 10: 0, 5: 0, 1: 0};
    partnerData.forEach(partner => {
        totalBills[20] += partner.bills[20];
        totalBills[10] += partner.bills[10];
        totalBills[5] += partner.bills[5];
        totalBills[1] += partner.bills[1];
    });
    
    // Update bills needed summary
    document.getElementById('twentyCount').textContent = totalBills[20];
    document.getElementById('tenCount').textContent = totalBills[10];
    document.getElementById('fiveCount').textContent = totalBills[5];
    document.getElementById('oneCount').textContent = totalBills[1];
    
    // Render tip distribution cards
    tipDistributionList.innerHTML = '';
    let copyPasteText = '';
    
    partnerData.forEach(partner => {
        const calculation = `${partner.hours} × $${state.hourlyRate.toFixed(2)} = $${partner.exact_tip_amount.toFixed(2)}`;
        
        // Create partner card
        const card = document.createElement('div');
        card.classList.add('partner-card');
        
        // Split bills text into chips
        const billChips = partner.bills_text.split(',').map(bill => 
            `<span class="bill-chip">${bill.trim()}</span>`
        ).join(' ');
        
        card.innerHTML = `
            <div class="partner-card-header">
                <h4 class="partner-card-name">${partner.name}</h4>
                <span class="partner-card-amount">$${partner.tip_amount}</span>
            </div>
            <div class="mt-1">
                <span class="text-sm">${partner.hours} hours</span>
            </div>
            <div class="calculation-box">
                ${calculation} → $${partner.tip_amount}
            </div>
            <div class="bills-box">
                <div class="flex flex-wrap gap-1">
                    ${billChips}
                </div>
            </div>
        `;
        
        tipDistributionList.appendChild(card);
        copyPasteText += partner.formatted_output + '\n';
    });
    
    // Update copy-paste format
    copyPasteFormat.textContent = copyPasteText;
    
    // Show tip distribution section
    tipDistributionSection.classList.remove('hidden');
    
    // Update download links for the table
    updateDownloadLinks();
    
    // Increment week counter for next allocation
    state.weekCounter++;
    
    // Scroll to tip distribution section
    tipDistributionSection.scrollIntoView({behavior: 'smooth'});
});

// Save to History button
saveToHistoryBtn.addEventListener('click', function() {
    if (!state.distributedTips) return;
    
    const distribution = {
        week: state.weekCounter - 1,
        total_amount: state.totalTipAmount,
        total_hours: state.totalHours,
        partners: state.distributedTips
    };
    
    state.tipsHistory.push(distribution);
    
    // Update UI
    updateHistoryList();
    historySection.classList.remove('hidden');
    
    // Show success message
    alert('Distribution saved to history!');
});

// Functions for updating the UI
function updateDownloadLinks() {
    if (state.ocrResult) {
        const ocrBlob = new Blob([state.ocrResult], {type: 'text/plain'});
        downloadOcrBtn.href = URL.createObjectURL(ocrBlob);
    }
    
    if (state.tipCalculated && state.distributedTips) {
        const tableHtml = generateHtmlTable();
        const tableBlob = new Blob([tableHtml], {type: 'text/html'});
        downloadTableBtn.href = URL.createObjectURL(tableBlob);
        downloadTableBtn.classList.remove('hidden');
    } else {
        downloadTableBtn.classList.add('hidden');
    }
}

function updateHistoryList() {
    historyList.innerHTML = '';
    
    state.tipsHistory.forEach((dist, i) => {
        const historyItem = document.createElement('div');
        historyItem.innerHTML = `
            <div class="custom-card mb-4">
                <h4 class="font-bold starbucks-green">Week ${dist.week}</h4>
                <p>Total: $${dist.total_amount.toFixed(2)} for ${dist.total_hours.toFixed(2)} hours</p>
                <div class="mt-2 pl-4">
                    ${dist.partners.map(partner => 
                        `<div class="mb-1">
                            ${partner.name} | #${partner.number} | ${partner.hours} hours | $${partner.tip_amount} | ${partner.bills_text}
                        </div>`
                    ).join('')}
                </div>
            </div>
        `;
        historyList.appendChild(historyItem);
    });
}

function generateHtmlTable() {
    const tipData = state.distributedTips.map(partner => {
        const exactAmount = partner.exact_tip_amount;
        const calculation = `${partner.hours} × $${state.hourlyRate.toFixed(2)} = $${exactAmount.toFixed(2)}`;
        
        return {
            "Partner Name": partner.name,
            "#": partner.number,
            "Hours": partner.hours,
            "Calculation": calculation,
            "Cash Amount": `$${partner.tip_amount}`,
            "Bills": partner.bills_text
        };
    });
    
    let tableRows = '';
    tipData.forEach(partner => {
        tableRows += `
            <tr>
                <td>${partner['#']}</td>
                <td>${partner['Partner Name']}</td>
                <td>${partner['Hours']}</td>
                <td class="calculation">${partner['Calculation']}</td>
                <td class="cash-amount">${partner['Cash Amount']}</td>
                <td>${partner['Bills']}</td>
            </tr>
        `;
    });
    
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>TipJar Results</title>
            <style>
                body {
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                    margin: 20px;
                    padding: 0;
                    color: #333;
                }
                h1 {
                    color: #00704A;
                    text-align: center;
                }
                .info {
                    margin: 10px 0;
                    background-color: #f8f9fa;
                    padding: 10px;
                    border-radius: 8px;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                    border-radius: 8px;
                    overflow: hidden;
                }
                th, td {
                    border: 1px solid #ddd;
                    padding: 12px 8px;
                    text-align: left;
                }
                th {
                    background-color: #00704A;
                    color: white;
                }
                tr:nth-child(even) {
                    background-color: #f2f2f2;
                }
                .calculation {
                    color: #666;
                    font-size: 0.9em;
                }
                .cash-amount {
                    font-weight: bold;
                    color: #00704A;
                }
                @media (max-width: 600px) {
                    th, td {
                        padding: 8px 4px;
                        font-size: 14px;
                    }
                }
            </style>
        </head>
        <body>
            <h1>Tip Distribution Results</h1>
            <div class="info">
                <p><strong>Hourly Rate Calculation:</strong> $${state.totalTipAmount.toFixed(2)} ÷ ${state.totalHours.toFixed(2)} = $${state.hourlyRate.toFixed(2)} per hour</p>
                <p><strong>Bills Needed:</strong> ${totalBills[20]} × $20, ${totalBills[10]} × $10, ${totalBills[5]} × $5, ${totalBills[1]} × $1</p>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Partner Name</th>
                        <th>Hours</th>
                        <th>Calculation</th>
                        <th>Cash</th>
                        <th>Bills</th>
                    </tr>
                </thead>
                <tbody>
                    ${tableRows}
                </tbody>
            </table>
        </body>
        </html>
    `;
}
</script> 