

let conversationVue
let found = 0;

document.addEventListener('DOMContentLoaded', () => {
	conversationVue = new Vue({
		el: '#messages',
		data: {
			messages: []
		},
	})
})



if (annyang) {

	var synthesis = window.speechSynthesis
	var utterance = new SpeechSynthesisUtterance()
	var voices, nicole
	setTimeout(() => {
		voices = synthesis.getVoices()
		nicole = voices.filter(voice => voice.name == 'Nicole')[0]
		utterance.voice = nicole

		if (!nicole) {
			nicole = voices.filter(voice => voice.name == 'Google English')[0]
		}
	}, 1000)

	utterance.voice = nicole
	console.log(synthesis)
	utterance.pitch = 1
	utterance.rate = 0.9


	annyang.addCommands({
		'hello': sayHello,
		'hi': sayHello,
		'namaste': sayHello,
		'namaskar': sayHello,
		'something about director': director,
		'head of :dept': hod,
		'show me details of :name': findDoc,
		'I want to update my :prop': update,
		'Email of :emailname': emaildetail

	})

	function emaildetail(emailname){
		annyang.abort()
		fetch("/search/" + emailname)
			.then(resp => resp.json())
			.then(data => {
				console.log(data);

				let msg = {
					from: 'machine',
					text: 'User Found'
					// text: 'Hi!'
				}
				if (data.results.length == 0) {
					msg.text = "No User Found"
				}
				else if (data.results.length == 1) {
					msg.text = data.results[0]
				}
				else {
					msg.text = "users found: " + data.results.length
				}
				conversationVue.messages.push(msg)
			})
	}

	function hod(dept) {
		annyang.abort()
		if ((dept == "CSE")) {
			let msg = {
				from: 'machine',
				text: "Prof. Nekita Chavhan"
				// text: 'Hi!'
			}

			conversationVue.messages.push(msg)
			utterance.text = msg.text
			utterance.voice = nicole
			annyang.abort()
			synthesis.speak(utterance)

		}
		else{
			let msg = {
				from: 'machine',
				text: "Dr. M. M. Khanapurkar"
				// text: 'Hi!'
			}

			conversationVue.messages.push(msg)
			utterance.text = msg.text
			utterance.voice = nicole
			annyang.abort()
			synthesis.speak(utterance)

		}


	}

	function director() {
		let msg = {
			from: 'machine',
			text: "Dr. Preeti Bajaj is an Electronics Engineer Graduated in 1991, Post graduate in 1998 and awarded doctorate in Electronics Engineering in 2004. Having 25 year of experience, currently she is Director of G.H. Raisoni College of Engineering, Nagpur. Her research interest includes Intelligent Transportation System, Soft Computing, Hybrid Intelligent Systems & Applications of Fuzzy logic in ITS. Her professional society affiliation includes Fellow- Institute of Engineers, Fellow IETE, Senior Member- IEEE, LM-ISTE, and LM-CSI. She is presently Secretary-IEEE India Council. She is also chair, IEEE Sub-section, Nagpur. She is also on Standing Committee of Global accreditation of IEEE Education Board (IEEE USA EAB) from 2016 till date. She has chaired many session in international conferences in India & abroad. "
			// text: 'Hi!'
		}

		conversationVue.messages.push(msg)
		utterance.text = msg.text
		utterance.voice = nicole
		annyang.abort()
		synthesis.speak(utterance)
	}

	function update() {
		let msg = {
			from: 'machine',
			text: "For any kind of changes do reach us at 'abc@abc.com'"
			// text: 'Hi!'
		}

		conversationVue.messages.push(msg)
		utterance.text = msg.text
		utterance.voice = nicole
		annyang.abort()
		synthesis.speak(utterance)
	}

	function sayHello() {
		// alert('Hello world!')
		let msg = {
			from: 'machine',
			text: "Hello There, i'm chatbot of GHRCE"
			// text: 'Hi!'
		}

		conversationVue.messages.push(msg)
		utterance.text = msg.text
		utterance.voice = nicole
		annyang.abort()
		synthesis.speak(utterance)
	}

	function findDoc(name) {
		annyang.abort()
		fetch("/search/" + name)
			.then(resp => resp.json())
			.then(data => {
				console.log(data);

				let msg = {
					from: 'machine',
					text: 'User Found'
					// text: 'Hi!'
				}
				if (data.results.length == 0) {
					msg.text = "No User Found"
				}
				else if (data.results.length == 1) {
					msg.text = data.results[0]
				}
				else {
					msg.text = "users found: " + data.results.length
				}
				conversationVue.messages.push(msg)
			})
	}

	annyang.addCallback('result', function (phrases) {
		let recogtext = phrases[0]
		conversationVue.messages.push({
			from: 'user',
			text: recogtext
		})
		console.log(recogtext);
	})




	// Tell KITT to use annyang
	SpeechKITT.annyang()

	// Define a stylesheet for KITT to use
	SpeechKITT.setStylesheet(
		'/css/flat-pumpkin.css'
	)
	SpeechKITT.setInstructionsText('Listening...')
	// SpeechKITT.displayRecognizedSentence({
	// 	newState: true
	// })

	// Render KITT's interface
	SpeechKITT.vroom()
}
