import os
import sys
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, KeepTogether
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY

def build_pdf(filename):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        rightMargin=0.5*inch,
        leftMargin=0.5*inch,
        topMargin=0.5*inch,
        bottomMargin=0.5*inch
    )

    styles = getSampleStyleSheet()
    
    primary_color = colors.HexColor('#0F172A')   # Navy Slate
    accent_blue = colors.HexColor('#2563EB')     # Royal Blue
    accent_teal = colors.HexColor('#0D9488')     # Teal
    accent_amber = colors.HexColor('#D97706')    # Amber
    text_dark = colors.HexColor('#1E293B')       # Charcoal
    bg_light = colors.HexColor('#F8FAFC')        # Off-white
    border_color = colors.HexColor('#E2E8F0')    # Light gray

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=22,
        textColor=primary_color,
        spaceAfter=4
    )

    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=14,
        textColor=accent_blue,
        spaceAfter=10
    )

    h2_style = ParagraphStyle(
        'Heading2Custom',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=16,
        textColor=primary_color,
        spaceBefore=10,
        spaceAfter=5
    )

    h3_style = ParagraphStyle(
        'Heading3Custom',
        parent=styles['Heading3'],
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=14,
        textColor=accent_teal,
        spaceBefore=6,
        spaceAfter=3
    )

    body_style = ParagraphStyle(
        'BodyCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=text_dark,
        spaceAfter=5
    )

    voiceover_style = ParagraphStyle(
        'VoiceoverCustom',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=9,
        leading=13,
        textColor=colors.HexColor('#0F172A'),
        spaceAfter=3
    )

    table_header_style = ParagraphStyle(
        'TableHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
        textColor=colors.white,
        alignment=TA_CENTER
    )

    table_cell_style = ParagraphStyle(
        'TableCell',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=11,
        textColor=text_dark
    )

    table_cell_bold = ParagraphStyle(
        'TableCellBold',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=11,
        textColor=primary_color
    )

    story = []

    # Title Banner
    story.append(Paragraph("🎬 MahaInnovate — Video Presentation Script & Workflow Guide", title_style))
    story.append(Paragraph("Hackathon Presentation Guide | Live Platform: <font color='#2563EB'><u>https://maha-innovate-six.vercel.app</u></font>", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=accent_blue, spaceAfter=8))

    # Meta Table
    meta_data = [
        [
            Paragraph("<b>Target Duration:</b> 3 – 5 Minutes", body_style),
            Paragraph("<b>Target Audience:</b> Hackathon Jury / Evaluators", body_style),
            Paragraph("<b>Roles:</b> Officer 🏛️ | Startup 🚀 | Evaluator ⚖️", body_style)
        ]
    ]
    t_meta = Table(meta_data, colWidths=[2.3*inch, 2.5*inch, 2.7*inch])
    t_meta.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), bg_light),
        ('BOX', (0,0), (-1,-1), 1, border_color),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(t_meta)
    story.append(Spacer(1, 8))

    # Part 1: Executive Summary
    story.append(Paragraph("📌 Part 1: Executive Summary & Core Value Proposition", h2_style))
    p1_text = (
        "<b>The Problem:</b> Traditional government technology procurement suffers from 12-to-18 month tender cycles, "
        "opaque technical evaluations, and high financial risk when deploying unproven startup solutions across public infrastructure.<br/>"
        "<b>The Solution:</b> <b>MahaInnovate</b> is an end-to-end AI-assisted platform built with Next.js 14, Node.js/Express, and Supabase PostgreSQL. "
        "It connects public sector challenges with verified DPIIT startups through a transparent 7-stage lifecycle — transitioning validated "
        "6-month sandbox pilots into statewide procurement scale-up contracts."
    )
    story.append(Paragraph(p1_text, body_style))
    story.append(Spacer(1, 6))

    # Part 2: 7-Stage Workflow Table
    story.append(Paragraph("🔄 Part 2: Complete 7-Stage GovTech Lifecycle Workflow", h2_style))
    
    flow_headers = [
        Paragraph("Stage #", table_header_style),
        Paragraph("Lifecycle Stage", table_header_style),
        Paragraph("Key Operations & System Output", table_header_style),
        Paragraph("Target Output", table_header_style)
    ]

    flow_data = [flow_headers]
    stages_info = [
        ("Stage 1", "Challenge Creation", "Government Officer posts public sector problem statement with Indian Rupee budget & timeline.", "Supabase Record Created"),
        ("Stage 2", "AI Tech Analysis", "AI Assistant parses description into IoT sensors, edge AI algorithms & uptime targets.", "Automated Tech Scope"),
        ("Stage 3", "Startup Marketplace", "Automated match engine scores DPIIT startups based on technical alignment.", "Match Score (>90%)"),
        ("Stage 4", "Proposal & 7-Criteria Scoring", "Startups submit proposals; Independent Evaluators score across 7 weighted criteria.", "Evaluated Proposal"),
        ("Stage 5", "Pilot Sandbox Telemetry", "Officer selects candidate for 6-month trial with real-time KPI progress tracking.", "Active Telemetry Sandbox"),
        ("Stage 6", "Independent Validation", "Audit Directorate verifies KPI telemetry logs and issues performance certificate.", "Official PASSED Certificate"),
        ("Stage 7", "Procurement Scale-Up", "Validated solution recommended for statewide rollout with NLP Executive Report.", "Rs. 1.2 Cr Scaling Contract")
    ]

    for s_num, s_name, s_op, s_out in stages_info:
        flow_data.append([
            Paragraph(s_num, table_cell_bold),
            Paragraph(s_name, table_cell_bold),
            Paragraph(s_op, table_cell_style),
            Paragraph(s_out, table_cell_style)
        ])

    t_flow = Table(flow_data, colWidths=[0.7*inch, 1.8*inch, 3.4*inch, 1.6*inch])
    t_flow.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), primary_color),
        ('ALIGN', (0,0), (-1,0), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('GRID', (0,0), (-1,-1), 0.5, border_color),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, bg_light])
    ]))
    story.append(t_flow)
    story.append(Spacer(1, 10))

    # Part 3: Video Screenplay
    story.append(Paragraph("📽️ Part 3: Step-by-Step Video Screenplay & Voiceover Script", h2_style))

    scenes = [
        (
            "Scene 1: Introduction & Problem Statement",
            "0:00 – 0:45",
            "Show Landing Page (<b>maha-innovate-six.vercel.app</b>) with smooth scrolling down the 7-Stage Procurement Pipeline diagram.",
            "Welcome to MahaInnovate — the Next-Generation GovTech Challenge & Startup Procurement Platform. Traditional public sector technology procurement is often slow, complex, and unstandardized. MahaInnovate solves this by creating a real-time, database-driven lifecycle that connects Government problem statements directly with verified DPIIT startups through transparent pilot sandboxes."
        ),
        (
            "Scene 2: Challenge Creation & AI Analysis",
            "0:45 – 1:30",
            "Switch Role to <b>Government Officer</b>. Open <i>/challenges/create</i> (Smart Hospital Equipment Maintenance). Click <b>'AI Analyze Challenge'</b>.",
            "As a Government Officer, I create a challenge addressing critical equipment breakdown across 45 District Civil Hospitals. With one click, our integrated AI Assistant parses the problem statement, automatically extracting required IoT sensors, acoustic failure algorithms, 95% target uptime KPIs, and compliance requirements."
        ),
        (
            "Scene 3: Proposal Submission & 7-Criteria Scoring",
            "1:30 – 2:15",
            "Switch Role to <b>Startup</b> (<i>MedTech Predictive Systems</i>) & submit proposal. Next, switch to <b>Evaluator</b>, open <i>/evaluation</i>, adjust sliders, and click <b>'Submit Score'</b>.",
            "Next, MedTech Predictive Systems submits a comprehensive technical proposal. The proposal automatically enters the Evaluator Pending Queue. An Independent Evaluator scores the submission across 7 weighted criteria — including Problem Fit, Technical Feasibility, and Cost Effectiveness. Submitting the evaluation score atomically updates the status to 'Evaluated' and forwards it to the Government Officer."
        ),
        (
            "Scene 4: Government Review & Sandbox Selection",
            "2:15 – 3:00",
            "Switch Role to <b>Government Officer</b>. Open <i>/proposals</i>. Show evaluated proposal with scores. Click <b>'Select for Pilot Sandbox'</b>.",
            "The Government Officer reviews the evaluated proposal queue. Seeing an 88% evaluation score and zero audit risks, the officer selects the solution for a 6-Month Paid Pilot Sandbox Trial. This action automatically provisions real-time telemetry records in Supabase."
        ),
        (
            "Scene 5: Telemetry, Audit Certificate & Procurement Scale-Up",
            "3:00 – 3:45",
            "Navigate to <i>/pilots</i> (91% achievement progress bar) → <i>/validation</i> (PASSED Audit Certificate) → <i>/procurement</i> (Rs. 1.2 Cr Scaling Allocation).",
            "In Stage 5 (Pilots), we monitor real-time telemetry tracking ventilator uptime and downtime reduction. In Stage 6 (Validation), the Independent Audit Directorate issues an official Passed Audit Certificate. Finally, in Stage 7 (Procurement), the solution is recommended for statewide procurement scale-up across 45 District Hospitals with a Rs. 1.2 Crore budget allocation, complete with an AI-generated Executive Lifecycle Report."
        ),
        (
            "Scene 6: Conclusion & Live Demonstration Link",
            "3:45 – 4:00",
            "Show the Admin Analytics Dashboard (<i>/admin</i>) and Landing Page footer displaying live deployment links.",
            "MahaInnovate transforms government procurement from a slow administrative hurdle into a transparent, data-driven engine for public sector innovation. Experience the live platform at maha-innovate-six.vercel.app. Thank you!"
        )
    ]

    for title, timestamp, visual, script_text in scenes:
        scene_content = []
        scene_content.append(Paragraph(f"<b>{title}</b> &nbsp;&nbsp;|&nbsp;&nbsp; <font color='#D97706'>⏱️ {timestamp}</font>", h3_style))
        scene_content.append(Paragraph(f"<b>🎬 Screen Action:</b> {visual}", body_style))
        
        # Script Quote Box
        q_table = Table([[Paragraph(f"💬 <b>Voiceover Script:</b><br/><i>\"{script_text}\"</i>", voiceover_style)]], colWidths=[7.3*inch])
        q_table.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#F1F5F9')),
            ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor('#CBD5E1')),
            ('LINELEFT', (0,0), (-1,-1), 3, accent_blue),
            ('TOPPADDING', (0,0), (-1,-1), 5),
            ('BOTTOMPADDING', (0,0), (-1,-1), 5),
            ('LEFTPADDING', (0,0), (-1,-1), 7),
            ('RIGHTPADDING', (0,0), (-1,-1), 7),
        ]))
        scene_content.append(q_table)
        scene_content.append(Spacer(1, 6))
        story.append(KeepTogether(scene_content))

    # Recording Tips Card
    story.append(Spacer(1, 4))
    tips_title = Paragraph("<b>💡 Video Recording Best Practices</b>", h3_style)
    tips_body = Paragraph(
        "• <b>Browser Settings:</b> Use Brave or Chrome in Full Screen mode (press F11).<br/>"
        "• <b>Role Switching:</b> Always highlight the top-right <i>Role Switcher Dropdown</i> when toggling between Officer, Startup, and Evaluator.<br/>"
        "• <b>Audio & Video:</b> Record in 1080p (60 FPS) with a clean noise-canceled microphone.",
        body_style
    )
    t_tips = Table([[tips_title], [tips_body]], colWidths=[7.3*inch])
    t_tips.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#FEF3C7')),
        ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor('#FDE68A')),
        ('LINELEFT', (0,0), (-1,-1), 3, accent_amber),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 7),
        ('RIGHTPADDING', (0,0), (-1,-1), 7),
    ]))
    story.append(t_tips)

    doc.build(story)
    print(f"Successfully generated PDF: {filename}")

if __name__ == '__main__':
    art_path = r"C:\Users\ghadg\.gemini\antigravity-ide\brain\510a5bec-4eeb-4c1a-a501-811db741737b\MahaInnovate_Video_Script_and_Workflow.pdf"
    ws_path = r"c:\Antigravity\MahaInnovate\MahaInnovate_Video_Script_and_Workflow.pdf"
    
    build_pdf(art_path)
    build_pdf(ws_path)
