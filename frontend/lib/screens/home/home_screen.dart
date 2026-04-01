import 'package:flutter/material.dart';
import '../../models/post_model.dart';
import '../../widgets/post_card.dart';
import '../post/create_post_screen.dart';
import '../profile/profile_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  // Mock data for demonstration - No Backend Needed!
  final List<PostModel> _posts = [
    PostModel(
      id: '1',
      title: 'The Art of Deep Reading',
      content: 'In an age of distraction, deep reading is a superpower. It allows us to immerse ourselves in different worlds and perspectives...',
      authorId: 'u1',
      authorName: 'Sarah Jenkins',
      createdAt: DateTime.now(),
      likes: 124,
    ),
    PostModel(
      id: '2',
      title: 'Why I Still Love Physical Books',
      content: 'There is something about the smell of old paper and the weight of a hardback that Kindle just cannot replicate...',
      authorId: 'u2',
      authorName: 'Marcus Aurelius',
      createdAt: DateTime.now().subtract(const Duration(hours: 2)),
      likes: 89,
    ),
    PostModel(
      id: '3',
      title: 'Top 5 Sci-Fi Novels of 2024',
      content: 'This year has been incredible for speculative fiction. From space operas to cyberpunk thrillers, here are my top picks...',
      authorId: 'u3',
      authorName: 'TechReader',
      createdAt: DateTime.now().subtract(const Duration(days: 1)),
      likes: 245,
    ),
    PostModel(
      id: '4',
      title: 'Morning Routine: Tea and Tolstoy',
      content: 'Nothing beats starting the day with a hot cup of Earl Grey and a few chapters of War and Peace. It sets the tone for the day...',
      authorId: 'u4',
      authorName: 'ClassicLover',
      createdAt: DateTime.now().subtract(const Duration(days: 2)),
      likes: 56,
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('BookSocial Feed', style: TextStyle(fontWeight: FontWeight.bold)),
        actions: [
          IconButton(
            icon: const Icon(Icons.person_outline),
            onPressed: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const ProfileScreen())),
          ),
        ],
      ),
      body: ListView.builder(
        padding: const EdgeInsets.only(top: 8, bottom: 80),
        itemCount: _posts.length,
        itemBuilder: (context, index) => PostCard(post: _posts[index]),
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const CreatePostScreen())),
        label: const Text('Write Story'),
        icon: const Icon(Icons.edit),
      ),
    );
  }
}
