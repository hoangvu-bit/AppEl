import 'package:flutter/material.dart';

void main() {
  runApp(const AppEnglish());
}

class AppEnglish extends StatelessWidget {
  const AppEnglish({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'App English',
      theme: ThemeData(
        primaryColor: Colors.green,
        scaffoldBackgroundColor: Colors.white,
      ),
      home: const LessonMapScreen(),
    );
  }
}

class LessonMapScreen extends StatelessWidget {
  const LessonMapScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Chặng đường học', 
          style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white)
        ),
        backgroundColor: Colors.green,
        elevation: 0,
        centerTitle: true,
      ),
      body: Center(
        child: ElevatedButton(
          style: ElevatedButton.styleFrom(
            backgroundColor: Colors.green,
            padding: const EdgeInsets.symmetric(horizontal: 40, vertical: 15),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(20)
            ),
          ),
          onPressed: () {
            // Logic chuyển sang màn hình học từ vựng sẽ viết ở đây
          },
          child: const Text(
            'Bắt đầu Bài 1', 
            style: TextStyle(fontSize: 18, color: Colors.white)
          ),
        ),
      ),
    );
  }
}